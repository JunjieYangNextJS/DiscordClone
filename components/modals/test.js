const Testblock = () => {
  const values = {
    imageUrl:
      "https://utfs.io/f/f3863650-415f-4484-b6b4-77a9388f19e0-nbgssk.jpg",
    name: "Cute Onion",
    one: "more",
  };

  const server = {
    id: "779bceb2-e6f4-4ede-a91a-995db539dcfd",
    imageUrl:
      "https://utfs.io/f/f3863650-415f-4484-b6b4-77a9388f19e0-nbgssk.jpg",
    inviteCode: "4642b164-69bd-46bb-ba7d-d547c3c3f4df",
    name: "Cute Onion",
    one: "more",
  };

  console.log(values, server);

  let count = 0;

  for (const [key, value] of Object.entries(values)) {
    if (server[key] === value) {
      count += 1;
    }
  }

  if (count === Object.keys(values).length) {
    console.log("pass");
  } else {
    console.log("fail");
  }

  return <div>yah</div>;
};

export default Testblock;
