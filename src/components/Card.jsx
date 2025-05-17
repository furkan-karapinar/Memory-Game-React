import React from 'react'

const Card = ({ card, handleSelected, rotated, disabled }) => {

    const handleClick = () => {
        if (!disabled) {
            handleSelected(card);
        }
    }

    return (
        <div className= {`${rotated ? "mCard" : ""}`}>
            <div className={`${rotated ? " frontcard" : "backcard"} ring-[#000030] ring-6 w-[80px] h-[120px] aCard justify-center items-center rounded-lg flex`}>
                <div className={rotated ? "rotated" : ""}>

                    <img className={`front`} src={card.path} />
                    <img className='back' src="/img/desen.png" onClick={handleClick} />
                </div>
            </div >

        </div>
    )
}

export default Card