# Algorand Food

Algorand Food is a Next.js web application that allows users to order Vietnamese cuisine and pay using the Algorand cryptocurrency. This project demonstrates the integration of blockchain technology with a real-world use case in the food industry.

## Features

- Display a menu of authentic Vietnamese dishes
- Add items to a shopping cart
- Connect to Pera Wallet for Algorand transactions
- Process payments using Algorand
- Responsive and user-friendly interface
- Real-time cart updates and total calculation

## Technologies Used

- **Next.js**: React framework for building the frontend and API routes
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Typed superset of JavaScript for improved developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Algorand SDK**: For interacting with the Algorand blockchain
- **Pera Wallet Connect**: To enable Algorand wallet connectivity
- **@txnlab/use-wallet-react**: React hooks for Algorand wallet integration

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm (v6 or later)
- Git

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/anhdolla/algorand-food.git
   ```

2. Navigate to the project directory:
   ```
   cd algorand-food
   ```

3. Install the dependencies:
   ```
   pnpm install
   ```

4. Create a `.env.local` file in the root directory and add any necessary environment variables (e.g., Algorand node URLs, API keys).

5. Run the development server:
   ```
   pnpm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

1. Browse the menu of Vietnamese dishes displayed on the home page.
2. Click the "Add to cart" button to add items to your shopping cart.
3. Review your cart by checking the cart summary component.
4. Connect your Pera Wallet by clicking the "Connect Pera Wallet" button in the header.
5. Once connected, click the "Order now" button to process your payment using Algorand.
6. Confirm the transaction in your Pera Wallet.
7. Upon successful payment, you'll receive a confirmation, and your cart will be cleared.

## Project Structure

- `app/`: Contains the main application code
  - `components/`: Reusable React components
  - `page.tsx`: Main page component
  - `providers.tsx`: Sets up the wallet provider
  - `layout.tsx`: Root layout component
- `public/`: Static assets
- `styles/`: Global CSS styles

## Key Components

- `CartSummary`: Displays the current items in the cart and total price
- `WalletProvider`: Manages the wallet connection state
- `Product` interface: Defines the structure for food items

## Algorand Integration

The project uses the Algorand TestNet for transactions. Key integration points include:

- Wallet connection using Pera Wallet
- Transaction creation and signing using the Algorand SDK
- Atomic Transaction Composer for executing payments

## Customization

You can customize the menu items by modifying the `products` array in `app/page.tsx`. Each product should include an id, name, price, image URL, and description.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Algorand Foundation for providing the blockchain infrastructure
- Pera Wallet team for the wallet integration tools
- Next.js team for the excellent React framework

## Contact

For any questions or feedback, please open an issue on the GitHub repository or contact the maintainer at your-email@example.com.
