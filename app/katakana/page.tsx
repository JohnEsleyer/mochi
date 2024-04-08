'use client'
import Template from "@/components/PageTemplate";
import { useEffect, useState } from "react";

interface KatakanaMap{
    katakana: string;
    romaji: string;
}

const katakanaMap: KatakanaMap[] = [
    { katakana: "ア", romaji: "a" },
    { katakana: "イ", romaji: "i" },
    { katakana: "ウ", romaji: "u" },
    { katakana: "エ", romaji: "e" },
    { katakana: "オ", romaji: "o" },
    { katakana: "カ", romaji: "ka" },
    { katakana: "キ", romaji: "ki" },
    { katakana: "ク", romaji: "ku" },
    { katakana: "ケ", romaji: "ke" },
    { katakana: "コ", romaji: "ko" },
    { katakana: "サ", romaji: "sa" },
    { katakana: "シ", romaji: "shi" },
    { katakana: "ス", romaji: "su" },
    { katakana: "セ", romaji: "se" },
    { katakana: "ソ", romaji: "so" },
    { katakana: "タ", romaji: "ta" },
    { katakana: "チ", romaji: "chi" },
    { katakana: "ツ", romaji: "tsu" },
    { katakana: "テ", romaji: "te" },
    { katakana: "ト", romaji: "to" },
    { katakana: "ナ", romaji: "na" },
    { katakana: "ニ", romaji: "ni" },
    { katakana: "ヌ", romaji: "nu" },
    { katakana: "ネ", romaji: "ne" },
    { katakana: "ノ", romaji: "no" },
    { katakana: "ハ", romaji: "ha" },
    { katakana: "ヒ", romaji: "hi" },
    { katakana: "フ", romaji: "fu" },
    { katakana: "ヘ", romaji: "he" },
    { katakana: "ホ", romaji: "ho" },
    { katakana: "マ", romaji: "ma" },
    { katakana: "ミ", romaji: "mi" },
    { katakana: "ム", romaji: "mu" },
    { katakana: "メ", romaji: "me" },
    { katakana: "モ", romaji: "mo" },
    { katakana: "ヤ", romaji: "ya" },
    { katakana: "ユ", romaji: "yu" },
    { katakana: "ヨ", romaji: "yo" },
    { katakana: "ラ", romaji: "ra" },
    { katakana: "リ", romaji: "ri" },
    { katakana: "ル", romaji: "ru" },
    { katakana: "レ", romaji: "re" },
    { katakana: "ロ", romaji: "ro" },
    { katakana: "ワ", romaji: "wa" },
    { katakana: "ヲ", romaji: "wo" },
    { katakana: "ン", romaji: "n" },
  ];

const dakutenMap: KatakanaMap[] = [
    { katakana: "ガ", romaji: "ga" },
    { katakana: "ギ", romaji: "gi" },
    { katakana: "グ", romaji: "gu" },
    { katakana: "ゲ", romaji: "ge" },
    { katakana: "ゴ", romaji: "go" },
    { katakana: "ザ", romaji: "za" },
    { katakana: "ジ", romaji: "ji" },
    { katakana: "ズ", romaji: "zu" },
    { katakana: "ゼ", romaji: "ze" },
    { katakana: "ゾ", romaji: "zo" },
    { katakana: "ダ", romaji: "da" },
    { katakana: "ヂ", romaji: "ji" },
    { katakana: "ヅ", romaji: "zu" },
    { katakana: "デ", romaji: "de" },
    { katakana: "ド", romaji: "do" },
    { katakana: "バ", romaji: "ba" },
    { katakana: "ビ", romaji: "bi" },
    { katakana: "ブ", romaji: "bu" },
    { katakana: "ベ", romaji: "be" },
    { katakana: "ボ", romaji: "bo" },
];

const handakutenMap: KatakanaMap[] = [
    { katakana: "パ", romaji: "pa" },
    { katakana: "ピ", romaji: "pi" },
    { katakana: "プ", romaji: "pu" },
    { katakana: "ペ", romaji: "pe" },
    { katakana: "ポ", romaji: "po" }

];

export default function Katakana(){
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
            <div className={`h-full overflow-y-auto ${isPortrait ? 'p-2': 'p-5 pr-20 pl-20'}`}>
            <h1 className="text-xl font-bold">Basic Katakana</h1>
            <div className="grid grid-cols-5 gap-4 pb-5">
            {katakanaMap.map((item, index) => (
                <div key={index} className="p-4 border border-gray-700 rounded-md flex flex-col items-center shadow-xl">
                <div className="text-4xl font-bold text-green-300">{item.katakana}</div>
                <div className="mt-2">{item.romaji}</div>
                </div>
            ))}
            </div>

            <h1 className="text-xl font-bold">Dakuten</h1>
            <div className="grid grid-cols-5 gap-4 pb-5">
            {dakutenMap.map((item, index) => (
                <div key={index} className="p-4 border border-gray-700 rounded-md flex flex-col items-center shadow-xl">
                <div className="text-4xl font-bold text-green-300">{item.katakana}</div>
                <div className="mt-2">{item.romaji}</div>
                </div>
            ))}
            </div>
            <h1 className="text-xl font-bold">Handakuten</h1>
            <div className="grid grid-cols-5 gap-4 pb-5">
            {handakutenMap.map((item, index) => (
                <div key={index} className="p-4 border border-gray-700 rounded-md flex flex-col items-center shadow-xl">
                <div className="text-4xl font-bold text-green-300">{item.katakana}</div>
                <div className="mt-2">{item.romaji}</div>
                </div>
            ))}
            </div>
            </div>

            </Template>
    );  
}