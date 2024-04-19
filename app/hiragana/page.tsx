'use client'
import Template from "@/components/PageTemplate";
import { useEffect, useState } from "react";

interface HiraganaMap {
    hiragana: string;
    romaji: string;
}

const hiraganaMap: HiraganaMap[] = [
    { hiragana: "あ", romaji: "a" },
    { hiragana: "い", romaji: "i" },
    { hiragana: "う", romaji: "u" },
    { hiragana: "え", romaji: "e" },
    { hiragana: "お", romaji: "o" },
    { hiragana: "か", romaji: "ka" },
    { hiragana: "き", romaji: "ki" },
    { hiragana: "く", romaji: "ku" },
    { hiragana: "け", romaji: "ke" },
    { hiragana: "こ", romaji: "ko" },
    { hiragana: "さ", romaji: "sa" },
    { hiragana: "し", romaji: "shi" },
    { hiragana: "す", romaji: "su" },
    { hiragana: "せ", romaji: "se" },
    { hiragana: "そ", romaji: "so" },
    { hiragana: "た", romaji: "ta" },
    { hiragana: "ち", romaji: "chi" },
    { hiragana: "つ", romaji: "tsu" },
    { hiragana: "て", romaji: "te" },
    { hiragana: "と", romaji: "to" },
    { hiragana: "な", romaji: "na" },
    { hiragana: "に", romaji: "ni" },
    { hiragana: "ぬ", romaji: "nu" },
    { hiragana: "ね", romaji: "ne" },
    { hiragana: "の", romaji: "no" },
    { hiragana: "は", romaji: "ha" },
    { hiragana: "ひ", romaji: "hi" },
    { hiragana: "ふ", romaji: "fu" },
    { hiragana: "へ", romaji: "he" },
    { hiragana: "ほ", romaji: "ho" },
    { hiragana: "ま", romaji: "ma" },
    { hiragana: "み", romaji: "mi" },
    { hiragana: "む", romaji: "mu" },
    { hiragana: "め", romaji: "me" },
    { hiragana: "も", romaji: "mo" },
    { hiragana: "や", romaji: "ya" },
    { hiragana: "ゆ", romaji: "yu" },
    { hiragana: "よ", romaji: "yo" },
    { hiragana: "ら", romaji: "ra" },
    { hiragana: "り", romaji: "ri" },
    { hiragana: "る", romaji: "ru" },
    { hiragana: "れ", romaji: "re" },
    { hiragana: "ろ", romaji: "ro" },
    { hiragana: "わ", romaji: "wa" },
    { hiragana: "を", romaji: "wo" },
    { hiragana: "ん", romaji: "n" }
];

const dakutenMap: HiraganaMap[] = [
    { hiragana: "が", romaji: "ga" },
    { hiragana: "ぎ", romaji: "gi" },
    { hiragana: "ぐ", romaji: "gu" },
    { hiragana: "げ", romaji: "ge" },
    { hiragana: "ご", romaji: "go" },
    { hiragana: "ざ", romaji: "za" },
    { hiragana: "じ", romaji: "ji" },
    { hiragana: "ず", romaji: "zu" },
    { hiragana: "ぜ", romaji: "ze" },
    { hiragana: "ぞ", romaji: "zo" },
    { hiragana: "だ", romaji: "da" },
    { hiragana: "ぢ", romaji: "ji" },
    { hiragana: "づ", romaji: "zu" },
    { hiragana: "で", romaji: "de" },
    { hiragana: "ど", romaji: "do" }
];

const handakutenMap: HiraganaMap[] = [
    { hiragana: "ぱ", romaji: "pa" },
    { hiragana: "ぴ", romaji: "pi" },
    { hiragana: "ぷ", romaji: "pu" },
    { hiragana: "ぺ", romaji: "pe" },
    { hiragana: "ぽ", romaji: "po" }

];

export default function Hiragana() {
    var heightWidth;
    if (typeof window == "undefined") {
        console.log('Server');
    } else {
        heightWidth = window.innerHeight > window.innerWidth;
    }

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPortrait, setIsPortrait] = useState(heightWidth);

    const handleOrientationChange = () => {
        setIsPortrait((window.innerHeight > window.innerWidth - 180));
    };

    useEffect(() => {
        window.addEventListener('resize', handleOrientationChange);
        return () => {
            window.removeEventListener('resize', handleOrientationChange);
        };
    }, []);


    return (
        <Template>
            <div className={`overflow-y-auto ${isPortrait ? 'p-2' : 'p-5 pr-20 pl-20'} bg-gray-800 h-full `}>
               {/* h-10 fixes broken layout */}
                <div className="h-10">
                    <h1 className="text-xl font-bold">Hiragana</h1>
                    <div className="grid grid-cols-5 gap-4 pb-5">
                        {hiraganaMap.map((item, index) => (
                            <div key={index} className="p-4 border border-gray-700 rounded-md flex flex-col items-center shadow-xl">
                                <div className="text-4xl font-bold text-yellow-300">{item.hiragana}</div>
                                <div className="mt-2">{item.romaji}</div>
                            </div>
                        ))}
                    </div>

                    <h1 className="text-xl font-bold">Dakuten</h1>
                    <div className="grid grid-cols-5 gap-4 pb-5">
                        {dakutenMap.map((item, index) => (
                            <div key={index} className="p-4 border border-gray-700 rounded-md flex flex-col items-center shadow-xl">
                                <div className="text-4xl font-bold text-yellow-300">{item.hiragana}</div>
                                <div className="mt-2">{item.romaji}</div>
                            </div>
                        ))}
                    </div>
                    <h1 className="text-xl font-bold">Handakuten</h1>
                    <div className="grid grid-cols-5 gap-4 pb-5">
                        {handakutenMap.map((item, index) => (
                            <div key={index} className="p-4 border border-gray-700 rounded-md flex flex-col items-center shadow-xl">
                                <div className="text-4xl font-bold text-yellow-300">{item.hiragana}</div>
                                <div className="mt-2">{item.romaji}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </Template>
    );
}