import hre from 'hardhat'
import 'dotenv/config'
import * as Config from "./config";

async function main() {
    await Config.initConfig();
    // const ContractAddress = Config.getConfig().localhost;
    const contract = {
        name: "Demo",
        address: Config.getConfig().localhost.Demo
    }

    // for (const [name, address] of Object.entries(ContractAddress)) {
    console.log(`---------- Begin verify contract: ${contract.name} --------------`)
    try {
        await hre.run(`verify:verify`, {
            address: contract.address as string,
        })
    } catch (e) {
        console.log(e)
    }
    console.log(`---------- Complete verify contract: ${contract.name} --------------`)
    // }
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
