import React from 'react';



export default function EndScreen ({ score, highscore, onRestart}) {

    const getResultMessage = () => {

        if (score >= highScore && highScore > 0) return "Nytt rekord!";
        if (score > 0) return "Bra spelat!";
        return "Försök igen!";

    }

    return (



    )


}