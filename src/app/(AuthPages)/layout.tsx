import { ReactNode } from "react";

const AuthPagesLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className=" bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen pt-20">
      <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
        <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10">
          {children}
        </div>
      </div>
    </section>
  );
};

export default AuthPagesLayout;
