const Error = () => {
  return (
    <div className="min-h-[85.3vh]  flex justify-center items-center flex-col gap-2">
      <div className="mockup-window border bg-base-300 ">
        <div className="flex justify-center px-4 py-16 bg-base-200 items-center flex-col gap-2">
          <h1 className="text-2xl">Oops! Something seems wrong</h1>
          <div className="flex flex-col w-full border-opacity-50">
            <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
              Clear the cookies and Refresh the Page
            </div>
            <div className="divider">OR</div>
            <div className="grid h-20 card bg-base-300 rounded-box place-items-center px-10">
              Check the backend (Json server) is up and Ruuning - Some unknown
              issue is happening of TIME_WAIT
            </div>
            <div className="divider">OR</div>
            <div className="grid h-20 card bg-base-300 rounded-box place-items-center px-10">
              Contact the Dev - Vignesh Gupta
              <a className="link-hover" href="mailto:vignesh.gupta@hcl.com"> vignesh.gupta@hcl.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
