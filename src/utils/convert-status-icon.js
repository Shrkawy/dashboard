import Status from "../components/UI/Status";

export const convertStatusToIcon = (status) => {
  let statusIcon;

  switch (status) {
    case "Canceled":
      return (statusIcon = <Status label="Canceled" canceled />);
    case "Pending":
      return (statusIcon = <Status label="Pending" pending />);
    case "Deliverd":
      return (statusIcon = <Status label="Deliverd" deliverd />);
    default:
      status = <Status label="..." />;
  }

  return statusIcon;
};
