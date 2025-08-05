import { Grid } from "react-loader-spinner";

export const LoadingAnimation = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <Grid
        visible={true}
        height="80"
        width="80"
        color="#1d4339"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
      />
    </div>
  );
};
