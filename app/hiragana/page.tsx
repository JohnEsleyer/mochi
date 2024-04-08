'use client'
import Template from "@/components/PageTemplate";
import { useState } from "react";

export default function Hiragana(){
    const [isLoading, setIsLoading] = useState<boolean>(false);


    return (
        <Template>
            <div className="h-full overflow-y-auto">
            <hr/>
            <h1>Hiragana</h1>
            <div className="grid grid-cols-5 gap-4 p-2">
            {/* <!-- Row 1 --> */}
            <div className="bg-gray-200 p-4">1</div>
            <div className="bg-gray-200 p-4">2</div>
            <div className="bg-gray-200 p-4">3</div>
            <div className="bg-gray-200 p-4">4</div>
            <div className="bg-gray-200 p-4">5</div>
            {/* <!-- Row 2 --> */}
            <div className="bg-gray-200 p-4">6</div>
            <div className="bg-gray-200 p-4">7</div>
            <div className="bg-gray-200 p-4">8</div>
            <div className="bg-gray-200 p-4">9</div>
            <div className="bg-gray-200 p-4">10</div>
            {/* <!-- Row 3 --> */}
            <div className="bg-gray-200 p-4">11</div>
            <div className="bg-gray-200 p-4">12</div>
            <div className="bg-gray-200 p-4">13</div>
            <div className="bg-gray-200 p-4">14</div>
            <div className="bg-gray-200 p-4">15</div>
            {/* <!-- Row 4 --> */}
            <div className="bg-gray-200 p-4">16</div>
            <div className="bg-gray-200 p-4">17</div>
            <div className="bg-gray-200 p-4">18</div>
            <div className="bg-gray-200 p-4">19</div>
            <div className="bg-gray-200 p-4">20</div>
            {/* <!-- Row 5 --> */}
            <div className="bg-gray-200 p-4">21</div>
            <div className="bg-gray-200 p-4">22</div>
            <div className="bg-gray-200 p-4">23</div>
            <div className="bg-gray-200 p-4">24</div>
            <div className="bg-gray-200 p-4">25</div>
            {/* <!-- Row 6 --> */}
            <div className="bg-gray-200 p-4">26</div>
            <div className="bg-gray-200 p-4">27</div>
            <div className="bg-gray-200 p-4">28</div>
            <div className="bg-gray-200 p-4">29</div>
            <div className="bg-gray-200 p-4">30</div>
            {/* <!-- Row 7 --> */}
            <div className="bg-gray-200 p-4">31</div>
            <div className="bg-gray-200 p-4">32</div>
            <div className="bg-gray-200 p-4">33</div>
            <div className="bg-gray-200 p-4">34</div>
            <div className="bg-gray-200 p-4">35</div>
            {/* <!-- Row 8 --> */}
            <div className="bg-gray-200 p-4">36</div>
            <div className="bg-gray-200 p-4">37</div>
            <div className="bg-gray-200 p-4">38</div>
            <div className="bg-gray-200 p-4">39</div>
            <div className="bg-gray-200 p-4">40</div>
            {/* <!-- Row 9 --> */}
            <div className="bg-gray-200 p-4">41</div>
            <div className="bg-gray-200 p-4">42</div>
            <div className="bg-gray-200 p-4">43</div>
            <div className="bg-gray-200 p-4">44</div>
            <div className="bg-gray-200 p-4">45</div>
            {/* <!-- Row 10 --> */}
            <div className="bg-gray-200 p-4">46</div>
            <div className="bg-gray-200 p-4">47</div>
            <div className="bg-gray-200 p-4">48</div>
            <div className="bg-gray-200 p-4">49</div>
            <div className="bg-gray-200 p-4">50</div>
            </div>
            </div>

            </Template>
    );  
}