import gravatar from "gravatar";

const generateAvatar = (email) => {
  return gravatar.url(email, {
    protocol: "https",
    s: 100,
    d: "retro",
  });
};

export default generateAvatar;
