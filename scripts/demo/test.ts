import addressContract from "../../constants/config.json"; 

async function main() {
  const addressDemo = addressContract.localhost.Demo;

  console.log(addressDemo);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
