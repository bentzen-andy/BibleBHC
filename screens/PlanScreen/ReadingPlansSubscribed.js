import React from "react";
import { getStoredObjectValue } from "../../helpers/async-storage";

import ReadingPlans from "./ReadingPlans";

const ReadingPlansSubscribed = ({ route, navigation }) => {
  const getFilteredPlans = async (plans) => {
    let subscribedPlans = await getStoredObjectValue("subscribed-plans");
    subscribedPlans = !subscribedPlans ? [] : subscribedPlans;
    subscribedPlans = subscribedPlans.map((plan) => plan.planId);
    return plans.filter((plan) => subscribedPlans.includes(plan.id));
  };

  const planDetailView = "ReadingPlanSubscribedDetail";

  return (
    <ReadingPlans
      navigation={navigation}
      getFilteredPlans={getFilteredPlans}
      planDetailView={planDetailView}
    />
  );
};
export default ReadingPlansSubscribed;
