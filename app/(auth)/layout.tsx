import Image from "next/image";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="hidden w-1/2 items-center justify-center bg-brand p-10 lg:flex xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-14">
          <Image
            src="/logo-mobile.png"
            alt="logo"
            width={300}
            height={150}
            className="h-auto"
          />

          <div className="space-y-5 text-white">
            <h1 className="h1">Lock out the risk. 
            Let in the files.</h1>
            <p className="body-1">
              Organize your files, preview instantly, and access them anywhere with secure OTP login.
            </p>
          </div>
          <Image src="/illustration.webp" alt="files" width={582} height={582} className="transition-all hover:rotate-2 hover:scale-105"/>
        </div>
      </section>

      <section className="flex flex-1 flex-col items-center justify-center bg-white p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
          <Image src="/logo-mobile.png" alt = "logo" width={300} height={100} className="h-auto w-[200px] lg:w-[250px]" />
        </div>
        {children}
      </section>
      
      </div>
  );
};

export default layout;
