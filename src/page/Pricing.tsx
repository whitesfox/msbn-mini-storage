import React, { useEffect } from "react";
import Config3dPriceComponent from "components/Configuration3dprice/ConfigPrice";
import { useAuthStore } from "store/useAuth";
import Progress from "components/Ui/Loading/Progress";
const Pricing = () => {
  const { isAuthenticated, authenticatedUser } = useAuthStore();
  useEffect(() => {
    authenticatedUser();
  }, []);

  return (
    <>
      {!isAuthenticated && <Progress />}
      {isAuthenticated && <Config3dPriceComponent />}
    </>
  );
};

export default Pricing;
