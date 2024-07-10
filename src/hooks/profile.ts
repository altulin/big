import { useAppSelector } from "./hook";

const useProfile = () => {
  const { type } = useAppSelector((state) => state.user.dataMe);
  const isIndividual = type === "individual";
  return { isIndividual };
};

export default useProfile;
