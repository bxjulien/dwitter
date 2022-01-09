export default async function getContract() {
  const { ethereum } = window;
  
  if (ethereum) {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    console.log(accounts)
    return accounts[0];
  } else alert("No Metamask found")
}