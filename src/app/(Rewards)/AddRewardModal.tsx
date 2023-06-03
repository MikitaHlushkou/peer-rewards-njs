"use client";
// ui
import { SyntheticEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Fragment } from "preact";
import { useFormik } from "formik";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { Autocomplete, TextField } from "@mui/material";
import { addRewardSchema } from "@/app/(Rewards)/ValidationSchema";
import Input from "@/components/Input/Input";
import { INPUT_TYPES, QUERY_KEYS } from "@/enum";
// hooks
import useDebounce from "@/hooks/useDebounce";
import useUser from "@/hooks/useUser";
// services
import { usernameSearchQuery } from "@/services/search";
import { addRewardQuery } from "@/services/rewards";
// styles and types
import "./AddRewardModal.css";
import { IReward, IUsersList } from "@/types";

const AddRewardModal = () => {
  const queryClient = useQueryClient();
  const {
    isAuthenticated,
    fullName: loggedInUser,
    receivedRewardAmount,
  } = useUser();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [searchedPersonName, setSearchedPersonName] = useState("");
  const search = useDebounce(searchedPersonName, 500);

  const { data } = useQuery<IUsersList[]>([QUERY_KEYS.usersList, search], () =>
    usernameSearchQuery(search)
  );

  const usersList = (data as IUsersList[])?.filter(
    (user) => user?.fullName !== loggedInUser
  ) ?? [{ id: "", fullName: "" }];

  const addReward = useMutation({
    mutationFn: addRewardQuery,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.rewards],
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.userProfile],
      });
      handleCloseModal();
    },
  });

  const { setFieldValue, getFieldProps, handleSubmit, errors } = useFormik({
    initialValues: {
      rewardedPerson: { id: "", fullName: "" },
      reward: "",
      comment: "",
    },
    validationSchema: addRewardSchema(receivedRewardAmount),
    onSubmit: (values, { resetForm }) => {
      try {
        const newReward: IReward = {
          ...values,
          senderOfTheReward: loggedInUser,
        };
        addReward.mutate(newReward);
        resetForm();
      } catch (e) {
        setError(e);
      }
    },
  });

  const inputFields = [
    {
      fieldName: "rewardedPerson",
      label: "To",
      type: "text",
      inputType: INPUT_TYPES.select,
    },
    {
      fieldName: "reward",
      label: "Reward",
      type: "number",
      inputType: INPUT_TYPES.input,
    },
    {
      fieldName: "comment",
      label: "Why?",
      type: "text",
      inputType: INPUT_TYPES.textArea,
    },
  ];

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const handlePersonAutocomplete = (event: SyntheticEvent, value: string) =>
    setSearchedPersonName(value);

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger className={!isAuthenticated && "hidden"} asChild>
        <button
          disabled={!isAuthenticated}
          onClick={handleOpenModal}
          className="absolute right-10 top-[-21px] bg-white rounded-full border-solid  border-2 border-black  "
        >
          <PlusIcon className={"w-10 h-10 hover:stroke-blue-600  "} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        {error && (
          <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
        )}
        <Dialog.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="DialogContent"
          onInteractOutside={handleCloseModal}
        >
          <Dialog.Title className="DialogTitle">Reward user</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Pls provide reward and a comment :)
          </Dialog.Description>
          {inputFields.map(({ inputType, type, fieldName, label }) => {
            let renderedInput = <></>;

            switch (inputType) {
              case INPUT_TYPES.input:
                renderedInput = (
                  <Input
                    className="Input"
                    {...getFieldProps(fieldName)}
                    id={fieldName}
                    type={type}
                  />
                );
                break;
              case INPUT_TYPES.textArea:
                renderedInput = (
                  <textarea
                    className="TextArea"
                    {...getFieldProps(fieldName)}
                    id={fieldName}
                    rows={4}
                  />
                );
                break;
              case INPUT_TYPES.select:
                renderedInput = (
                  <Autocomplete
                    disablePortal
                    options={usersList}
                    sx={{ width: 300 }}
                    {...getFieldProps(fieldName)}
                    getOptionLabel={(option) => option?.fullName ?? option}
                    onInputChange={handlePersonAutocomplete}
                    onChange={(event, value) => setFieldValue(fieldName, value)}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option?.id}>
                          {option?.fullName}
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        autoFocus={false}
                        className={"Autocomplete"}
                        {...params}
                        label="Person"
                      />
                    )}
                  />
                );

                break;
              default:
                renderedInput = <></>;
                break;
            }

            return (
              <Fragment key={`${fieldName}-${label}`}>
                <fieldset autoFocus={false} className="Fieldset">
                  <label
                    autoFocus={false}
                    className="Label"
                    htmlFor={fieldName}
                  >
                    {label}
                  </label>
                  {renderedInput}
                </fieldset>
                <p className="text-right text-sm mb-1  text-red-600">
                  {errors[fieldName]}
                </p>
              </Fragment>
            );
          })}

          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button onClick={handleSubmit} className="Button green">
                Save changes
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              onClick={handleCloseModal}
              className="IconButton"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddRewardModal;
