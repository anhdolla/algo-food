"use client"
import { PeraWalletConnect } from "@perawallet/connect";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaWallet } from 'react-icons/fa';
import algosdk from 'algosdk';
import { NetworkId, useWallet } from '@txnlab/use-wallet-react';
import React from "react";
import CartSummary from './components/CartSummary';
import Image from 'next/image';

const peraWallet = new PeraWalletConnect();

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function Home() {
  const {
    algodClient,
    activeAddress,
    setActiveNetwork,
    transactionSigner,
    wallets
  } = useWallet();
  const [accountAddress, setAccountAddress] = useState<string | null>(null);
  const isConnectedToPeraWallet = !!accountAddress;
  const [products] = useState([
    { id: 1, name: "Beef Noodle Soup", price: 0.015, image: "https://salmon-raw-harrier-526.mypinata.cloud/ipfs/QmR6jrq4PuFB1vkgjJFzfF77spFWCLftajCn8EFoxhxu4N", description: "Delicious beef noodle soup with soft beef and fresh noodles" },
    { id: 2, name: "Vietnamese Sandwich", price: 0.008, image: "https://salmon-raw-harrier-526.mypinata.cloud/ipfs/QmQF69jo3sX3gJgeMwMrFMza7yRbzoJd6x4tJdsTMqdkHz", description: "Crispy sandwich with meat and fresh vegetables" },
    { id: 3, name: "Grilled Pork & Rice Noodles", price: 0.018, image: "https://salmon-raw-harrier-526.mypinata.cloud/ipfs/QmSVA2GNhn3PXFrMxNALmYHhrTWqBggwMKgD6X7z1F7TB5", description: "Rice noodles with grilled pork and special sauce" },
    { id: 4, name: "Spring Rolls", price: 0.012, image: "https://salmon-raw-harrier-526.mypinata.cloud/ipfs/QmX58MAzLeQHNWcC8Pv52oGmh7xVrbAkvFRpZuv5AddL7z", description: "Fresh spring rolls with shrimp, meat, and herbs" },
    { id: 5, name: "Broken Rice", price: 0.017, image: "https://salmon-raw-harrier-526.mypinata.cloud/ipfs/QmZCbL6sqFTExjDn2UKVjn5M1rqbtgFBVWW8uoDacLMJ47", description: "Broken rice with grilled pork, egg, and pickles" },
    { id: 6, name: "Hue Beef Noodle Soup", price: 0.02, image: "https://salmon-raw-harrier-526.mypinata.cloud/ipfs/Qmf2AF4YDdJNofM5ut5wb2EYAGF4GUZLQ24iVK31cN6uCS", description: "Spicy beef noodle soup with pork and beef" },
    { id: 7, name: "Sizzling Pancake", price: 0.014, image: "https://salmon-raw-harrier-526.mypinata.cloud/ipfs/QmPM1JH6KcWn3RGn3VPu982ETADsSFhfSkh319SQty7tj9", description: "Crispy pancake with shrimp, meat, and bean sprouts" },
    { id: 8, name: "Fried Spring Rolls", price: 0.01, image: "https://salmon-raw-harrier-526.mypinata.cloud/ipfs/QmdZkX5jwA1qdempjphMdEqVSaGWgA2nqwu6D9KduNhctk", description: "Crispy fried spring rolls with meat and mushrooms" },
    { id: 9, name: "Blockchain Crab", price: 0.03, image: "https://salmon-raw-harrier-526.mypinata.cloud/ipfs/QmQXaymEBdGApwt95JtKaZTEeS4APrzZPUfwZtDJj4SXYg", description: "Special dish: Salted crab with blockchain technology" },
  ]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    peraWallet
      .reconnectSession()
      .then((accounts: string[]) => {
        peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);
        if (accounts.length) {
          setAccountAddress(accounts[0]);
        }
      })
      .catch((e: Error) => console.log(e));
  }, [handleDisconnectWalletClick]);

  function handleConnectWalletClick() {
    wallets[0]
      .connect()
      .then((newAccounts) => {
        peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);
        setAccountAddress(newAccounts[0].address);
        setActiveNetwork(NetworkId.TESTNET);
        wallets[0].setActiveAccount(newAccounts[0].address)
      })
      .catch((error) => {
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          console.log(error);
        }
      });
  }

  function handleDisconnectWalletClick() {
    wallets[0].disconnect();
    setAccountAddress(null);
  }

  function addToCart(product: Product) {
    setCart((prevCart) => [...prevCart, product]);
  }

  async function handlePurchase() {
    if (!accountAddress || !activeAddress) {
      alert('Please connect your wallet before making a payment.');
      return;
    }

    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    try {
      const atc = new algosdk.AtomicTransactionComposer()
      const suggestedParams = await algodClient.getTransactionParams().do()
      const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        suggestedParams: suggestedParams,
        from: accountAddress,
        to: "DTUA424DKCJYPHF5MLO6CL4R2BWOTH2GLOUQA257K5I7G65ENHSDJ4TTTE",
        amount: totalAmount * 1000000,
      });
      
      atc.addTransaction({ txn: transaction, signer: transactionSigner })

      const result = await atc.execute(algodClient, 2)
      console.info(`Transaction successful!`, {
        confirmedRound: result.confirmedRound,
        txIDs: result.txIDs
      })
      alert('Payment successful!')
      setCart([]);
    } catch (error) {
      console.error('Error during transaction:', error)
      alert('An error occurred during payment. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-orange-200">
      <header className="bg-orange-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Algorand Food</h1>
          <button
            className="bg-white text-orange-600 px-4 py-2 rounded-full flex items-center hover:bg-orange-100 transition duration-300"
            onClick={isConnectedToPeraWallet ? handleDisconnectWalletClick : handleConnectWalletClick}
          >
            <FaWallet className="mr-2" />
            {isConnectedToPeraWallet ? "Disconnect Wallet" : "Connect Pera Wallet"}
          </button>
        </div>
      </header>

      <main className="container mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-orange-800">Our Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
              <Image 
                src={product.image} 
                alt={product.name} 
                width={500} 
                height={300} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-xl mb-2 text-orange-600">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-orange-500">{product.price} Algo</span>
                  <button
                    className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition duration-300 flex items-center"
                    onClick={() => addToCart(product)}
                  >
                    <FaShoppingCart className="mr-2" />
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <CartSummary cart={cart} />

        <div className="flex justify-center mt-8">
          <button
            className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300 shadow-lg"
            onClick={handlePurchase}
          >
            Order now
          </button>
        </div>
      </main>

      <footer className="bg-orange-600 text-white p-4 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Blockchain Restaurant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
