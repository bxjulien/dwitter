export default async function getContract(address, abi) {
  const { ethereum } = window;

  if (ethereum) {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0];
  } else console.error("No Metamask found")
}