import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const useProfile = () => {
  const location = useLocation();
  const [isIndividual, setIsIndividual] = useState<boolean | null>(null);

  useEffect(() => {
    setIsIndividual(false);
  }, [location.pathname]);

  return { isIndividual };
};

export default useProfile;
