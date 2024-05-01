import React from 'react'

const SportsAndFitnessSvg=({height,width})=>{
    return (
        <svg width={width} height={height} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M195.2 828.8a448 448 0 1 1 633.6-633.6 448 448 0 0 1-633.6 633.6zm45.248-45.248a384 384 0 1 0 543.104-543.104 384 384 0 0 0-543.104 543.104z"/><path fill="#000000" d="M497.472 96.896c22.784 4.672 44.416 9.472 64.896 14.528a256.128 256.128 0 0 0 350.208 350.208c5.056 20.48 9.856 42.112 14.528 64.896A320.128 320.128 0 0 1 497.472 96.896zM108.48 491.904a320.128 320.128 0 0 1 423.616 423.68c-23.04-3.648-44.992-7.424-65.728-11.52a256.128 256.128 0 0 0-346.496-346.432 1736.64 1736.64 0 0 1-11.392-65.728z"/></svg>
    )
}

const SportsAndFitness=()=>{
    return (
        <div className="flex flex-col space-y-2 items-center p-3">
                    <div className=" border-black border-2 rounded-md p-3">
                        <SportsAndFitnessSvg height={"70px"} width={"70px"}/>
                    </div>
                    <p className="font-bold">Sports And Fitness</p>
                </div>
    )
}

export default SportsAndFitness