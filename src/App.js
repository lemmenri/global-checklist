import './App.css';
import AppRouter from './routers/AppRouter';
import { addCardToCollection, getAmountOfCard, getCardFromCollection } from './scripts/Collection'

function App() {
  addCardToCollection("fe3a415f-5649-4d74-9ef7-803ac11169d4", "foil", 3, "EX")
  // const card = getCardFromCollection("54ced5cf-b51a-4dab-97f7-50fb18e5c463")
  // console.log(card)
  // const amount = getAmountOfCard("54ced5cf-b51a-4dab-97f7-50fb18e5c463", "nonfoil")
  // console.log(`Amount: ${amount}`)

  return (
    <div className="App text-dark bg-light">
      <AppRouter />
    </div>
  );
}

export default App;
