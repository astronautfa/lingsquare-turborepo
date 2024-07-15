import { Spinner } from "@ui/components/spinner"

const Loading = () => {
  return (
    <div className="container grid h-screen place-items-center">
      <Spinner className="w-6 h-6" />
    </div>
  );
};

export default Loading;
