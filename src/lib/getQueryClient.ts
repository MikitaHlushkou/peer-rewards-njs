import { cache } from "react";
import { QueryClient } from "@tanstack/react-query";
import { queryClientOptions } from "@/app/constants/constants";

const getQueryClient = cache(() => new QueryClient(queryClientOptions));
export default getQueryClient;
