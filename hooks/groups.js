import useUsers from "./users";

const useGroups = () => {
  const { userData, isLoading, error } = useUsers();
  const groups = new Map();

  // wait for the data to be fetched

  if (isLoading) {
    return {
      groups: [],
      isLoading,
      error,
    };
  }

  userData.forEach((user) => {
    const group = user.website.split(".")[1];
    if (groups.has(group)) {
      groups.set(group, [...groups.get(group), user]);
    } else {
      groups.set(group, [user]);
    }
  });
  return {
    groups,
    isLoading,
    error,
  };
};

export default useGroups;
