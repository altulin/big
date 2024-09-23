import { checkArr } from "@/service/checkArr";
import { useGetWinnersQuery } from "@/store/rtk/jury/works_winners";

const useWinners = (): { isWinners: boolean } => {
  const { data, isSuccess } = useGetWinnersQuery({});

  if (!isSuccess) return { isWinners: false };
  return { isWinners: checkArr(data?.results) };
};

export default useWinners;
