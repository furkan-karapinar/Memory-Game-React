import './App.css'
import { useState } from 'react'
import { useEffect } from 'react'
import Card from './components/Card'

function App() {

  const defaultCards = [
    {

      path: "/img/elma.png",
      matched: false,
    },
    {

      path: "/img/armut.png",
      matched: false,
    },
    {

      path: "/img/portakal.png",
      matched: false,
    },
    {

      path: "/img/limon.png",
      matched: false,
    },
    {

      path: "/img/karpuz.png",
      matched: false,
    },
    {

      path: "/img/kiraz.png",
      matched: false,
    },

  ]

  const character = [
    {
      id: 1,
      path: "/img/aki/idle.png",
    },
    {
      id: 2,
      path: "/img/aki/finded.png",
    },
    {
      id: 3,
      path: "/img/aki/win.png",
    }
  ]

  const [cards, setCards] = useState([])
  const [selectedOne, setSelectedOne] = useState(null);
  const [selectedCTwo, setSelectedTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [matchedCardsCount, setMatchedCardsCount] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);

  const prepareCards = () => {

    const sortedCards = [...defaultCards, ...defaultCards].sort(() => 0.5 - Math.random()).map((card) => ({ ...card, id: Math.random() }));

    setCards(sortedCards);
    resetTurn();
    setMatchedCardsCount(0);
  }

  const characterChange = () => {
    if (matchedCardsCount === 6) {
      setCharacterIndex(2);
    }
    else if (matchedCardsCount > 0) {
      setCharacterIndex(1);
      setTimeout(() => {
        setCharacterIndex(0);
      }, 1500);
    }
    else {
      setCharacterIndex(0);
    }
  }

  useEffect(() => {
    characterChange();
  }, [matchedCardsCount])


  const handleSelected = (card) => {
    selectedOne ? setSelectedTwo(card) : setSelectedOne(card);
  }

  useEffect(() => { prepareCards() }, [])

  useEffect(() => {
    if (selectedOne && selectedCTwo) {
      setDisabled(true);
      if (selectedOne.path === selectedCTwo.path) {
        setCards(prevCards => {
          return prevCards.map((card) => {
            if (card.path === selectedOne.path) {
              setMatchedCardsCount(matchedCardsCount + 1);

              return { ...card, matched: true }
            }
            else {
              return card;
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [selectedOne, selectedCTwo])

  const resetTurn = () => {
    setSelectedOne(null);
    setSelectedTwo(null);
    setDisabled(false);
    setCharacterIndex(0);
  }



  return (
    <>
      <div className='flex items-center justify-center h-screen'>

        <div className='grid grid-cols-3 gap-5'>

          <div className='flex flex-col items-center justify-center gap-5'>

            <img src="/img/title.png" className='w-[90%]' alt="" />
            <button className='ring-blue-700 bg-blue-500 text-white ring-2 px-3 py-2 rounded hover:translate-y-[1px] active:translate-y-[2px] active:bg-blue-800' onClick={() => prepareCards()}>Start Game</button>
            <h3 className='text-xl font-semibold text-center'>Matched Cards: {matchedCardsCount}</h3>

          </div>

          <div className='card shadow-2xl rounded-2xl p-10 col-2 bg-white'>
            <div className='card-body'>
              <div className='grid grid-cols-4 gap-8'>

                {
                  cards.map((card, index) => (
                    <Card
                      card={card}
                      key={index}
                      handleSelected={handleSelected}
                      disabled={disabled}
                      rotated={card == selectedOne || card == selectedCTwo || card.matched} />
                  ))}


              </div>
            </div>
          </div>

          <div>
            <img className='rounded-full w-full h-full' src={character[characterIndex].path} />
          </div>


        </div>
      </div>


    </>
  )
}

export default App
