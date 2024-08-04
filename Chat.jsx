import React, { useEffect, useRef, useState } from 'react'
import css from '../astylus/chat.module.css'
import { PixelArtCard } from 'react-pixelart-face-card'
import icon from '../img/icon.png'

function Chat() {
  //for input store
  const [input, setInput] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  //for input arr
  const [arr, setArr] = useState([]);
  //for faq
  const [recv, setRecv] = useState([]);
  //for realtime
  const [price, setPrice] = useState([]);
  //for image fetch 1
  const [img, setImg] = useState([]);
  const [load, setLoad] = useState(false);
  const [slide, setSlide] = useState(false);
  const [activ, setActiv] = useState({ one: true, two: false, three: false, four: false })
  const mssgend = useRef();  //for auto scroll
  const name = localStorage.getItem('name');
  const gen = localStorage.getItem('gen');
  var j = 0;

  useEffect(() => {               //to automatically scroll down after an input is sent
    mssgend.current?.scrollIntoView({ behavior: "smooth" })
  }, [input])

  function changeInput(e) {
    setInput(e.target.value);
  }

  const send = async (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      // FAQ
      if (activ.one) {
        
      }
      //Price fetch
      else if (activ.two) {
        setArr([...arr, input])
        console.log(input);
        setLoad(true)
        const res1 = await fetch("https://crypton-backend.onrender.com/realtime", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: input })
        });
        var temp1 = await res1.json();
        setPrice([...price, temp1.ath.toFixed(2), temp1.atl.toFixed(2), temp1.high24h.toFixed(2), temp1.low24h.toFixed(2)]);
        setLoad(false);
      }
      //Analytics 1
      else if (activ.three) {
        setArr([...arr, input])
        setLoad(true);
        fetch('https://crypton-backend.onrender.com/plot', {
          method: 'POST', // Use the POST method
          // You can add headers if needed
          headers: {
            'Content-Type': 'application/json', // Adjust content type as needed
            // Add other headers if required
          },
          // You can pass any data as the request body
          body: JSON.stringify({ message: input }) // Replace with actual data
        })
          .then(response => response.blob())
          .then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            setImg([...img, imageUrl]);
          })
          .catch(error => {
            console.error('Error fetching image:', error);
          });
        setLoad(false);
      }
      //Analytics 2
      else if (activ.four) {

        setArr([...arr, input])
        console.log(arr);
        setLoad(true);
        fetch('https://crypton-backend.onrender.com/comparison', {
          method: 'POST', // Use the POST method
          // You can add headers if needed
          headers: {
            'Content-Type': 'application/json', // Adjust content type as needed
            // Add other headers if required
          },
          // You can pass any data as the request body
          body: JSON.stringify({ message: input }) // Replace with actual data
        })
          .then(response => response.blob())
          .then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            setImg([...img, imageUrl]);
          })
          .catch(error => {
            console.error('Error fetching image:', error);
          });
        setLoad(false);
      }


      setInput("");
    }

  }

  return (
    <div className={css.bdy}>
      <button onClick={() => setSlide(!slide)}><i className={`fa-solid  ${slide ? "" : "rotate-180"} transition ease-out delay-300 fa-circle-arrow-right fa-2xl ${css.slide}`} style={{ color: "#f7e22b" }}></i></button>
      <div className={css.top}>
        <img src={icon} alt="icon" className='h-[40px] w-[40px] inline'></img><span className='ml-2'>Crypton</span>
      </div>

      <div className={`${slide ? "max-lg:translate-x-[-300vw]" : ""} ${css.sidebar} transition ease-out delay-300`}>
        <PixelArtCard hover={false} random={true} size={200} tags={[(gen === "male") ? "human-male" : "human-female"]} />
        <h1 className="mb-12 text-xl mt-2">Hello, <span className='text-yellow-400 font-bold'>{name}</span>!</h1>

       
        <button onClick={() => { setActiv({ one: false, two: true, three: false, four: false }); setSlide(!slide); setArr([]); setImg([]); setRecv([]); setPrice([]) }} className={`h-[40px] w-[120px] ${css.btn}`} style={{ backgroundImage: activ.two ? "var(--prim)" : "" }}>
          Price</button>
        <button onClick={() => { setActiv({ one: false, two: false, three: true, four: false }); setSlide(!slide); setArr([]); setImg([]); setRecv([]); setPrice([]) }} className={`h-[40px] w-[120px] ${css.btn}`} style={{ backgroundImage: activ.three ? "var(--prim)" : "" }}>
          Analytics 1</button>
        <button onClick={() => { setActiv({ one: false, two: false, three: false, four: true }); setSlide(!slide); setArr([]); setImg([]); setRecv([]); setPrice([]) }} className={`h-[40px] w-[120px] ${css.btn}`} style={{ backgroundImage: activ.four ? "var(--prim)" : "" }}>
          Analytics 2</button>

      </div>

      <div className={css.chatArea}  >
        {/* FAQ */}
        {activ.one && (<div className={`${css.mssg2} max-sm:text-sm max-sm:min-w-[280px]`}><p>Hello there! 👋🪙 I am Crypton, Your go-to guide for all things cryptocurrency! 🌌🔍 </p><p> How can I assist you today? Feel free to ask away! 🚀💬</p></div>)}
        {activ.two && (<div className={`${css.mssg2} max-sm:text-sm max-sm:min-w-[300px]`}><p>Hello there! 📊🌐 Wondering about your crypto's current state?</p><p>Just type its name, and we'll show you the latest real time data of the same!. Stay informed effortlessly! 💹🚀</p></div>)}
        {activ.three && (<div className={`${css.mssg2} max-sm:text-sm max-sm:min-w-[300px]`}><p>Hey there! 📈🔍 Ready to dive into crypto history?  </p><p>Just drop the name, and watch the magic unfold as we paint its entire journey on a sleek graph for you! 🚀📊</p></div>)}
        {activ.four && (<div className={`${css.mssg2} max-sm:text-sm max-sm:min-w-[300px]`}><p>Hi there! 🤝📊 Stuck picking a crypto? </p><p>No worries! Just type in the names of the two contenders, and we'll conjure up a comparison graph so you can see them go head-to-head. 📊🚀</p></div>)}
        {
          (activ.one && (
            <>
              <iframe className='max-sm:m-auto mr-5 w-[850px] h-[500px] max-lg:w-[700px] max-lg:h-[400px] max-md:w-[600px] max-md:h-[350px] max-sm:w-[320px] max-sm:h-[180px]' ></iframe>
            </>
          )
          )
        }

        {/* Latest Price fetch */}
        {
          (activ.two && (arr.map((data, i) => {
            j = (i * 4);
            return (
              <>
                <div key={i} className={`${css.mssg1}`}>
                  <p>{data}</p>
                </div>
                {(((i * 4) >= (price.length + 1)) && !load) ? "" : (<div className={`${css.mssg2} max-sm:text-sm max-sm:min-w-[280px]`} id={i}>
                  <p className='text-yellow-500 text-xl'>{`For ${data}`}</p>
                  <p className='mb-2'>Currently the data prices are :</p>
                  <p>{`All time high :  $${price[j]}`}</p>
                  <p>{`All time low :  $${price[j + 1]}`}</p>
                  <p>{`24h high :  $${price[j + 2]}`}</p>
                  <p>{`24h low :  $${price[j + 3]}`}</p>
                </div>)}
              </>
            )
          })))
        }
        {/* Analytics type 1 */}
        {
          (activ.three && (arr.map((data, i) => {
            return (
              <>
                <div key={i} className={`${css.mssg1}`}>
                  <p>{data}</p>
                </div>
                {(i >= img.length) ? "" : (<div className='mx-[8px] my-[18px] p-2 bg-black text-white rounded-lg self-start'><img src={img[i]} alt='plot here' className='max-h-[500px] max-w-[600px] max-sm:max-w-[340px]' /></div>)}
              </>
            )
          })))
        }
        {/* Analytics 2 compare */}
        {
          (activ.four && (arr.map((data, i) => {
            return (
              <>
                <div key={i} className={`${css.mssg1}`}>
                  <p>{data}</p>
                </div>
                {(i >= img.length) ? "" : (<div className='mx-[8px] my-[18px] p-2 bg-black text-white rounded-lg self-start'><img src={img[i]} alt='plot here' className='max-h-[500px] max-w-[600px] max-sm:max-w-[340px]' /></div>)}
              </>
            )
          })))
        }


        {/* for autoscroll */}
        <div ref={mssgend} className='absolute bottom-0 right-0'></div>
      </div>

      <div className={css.foot}>
        <form onSubmit={send} className={css.inp}>
          {load && (<h1 className='text-3xl text-white font-bold'>Loading....</h1>)}

          

          {!load && activ.two && (<div style={{ "backgroundColor": "var(--dclight)" }} className='p-2 rounded-lg flex gap-4 max-sm:flex-col max-sm:text-sm max-sm:min-w-[200px]'><p className='inline text-white'>Choose a crypto: </p>
            <select onChange={changeInput} value={input} style={{ "backgroundColor": "var(--dclight)" }} className='rounded-lg px-3 text-white border-none'>
              <option>Select</option>
              <option>Bitcoin</option>
              <option>Ethereum</option>
              <option>Dogecoin</option>
              <option>Litecoin</option>
              <option>Tron</option>
              <option>XRP</option>
              <option>Monero</option>
              <option>Stellar</option>
              <option>Binance coin</option>
              <option>Chainlink</option>
              <option>Cardano</option>
              <option>Cosmos</option>
              <option>Solana</option>
              <option>Polkadot</option>
              <option>Uniswap</option>
              <option>Aave</option>
            </select>
          </div>)}
          {!load && activ.three && (<div style={{ "backgroundColor": "var(--dclight)" }} className='p-2 rounded-lg flex gap-4 max-sm:flex-col max-sm:text-sm max-sm:min-w-[200px]'><p className='inline text-white'>Select crypto to analyise: </p>
            <select onChange={changeInput} value={input} style={{ "backgroundColor": "var(--dclight)" }} className='rounded-lg px-3 text-white border-none'>
              <option>Select</option>
              <option>Bitcoin</option>
              <option>Ethereum</option>
              <option>Dogecoin</option>
              <option>Litecoin</option>
              <option>Tron</option>
              <option>XRP</option>
              <option>Monero</option>
              <option>Stellar</option>
              <option>Binance coin</option>
              <option>Chainlink</option>
              <option>Cardano</option>
              <option>Cosmos</option>
              <option>Solana</option>
              <option>Polkadot</option>
              <option>Uniswap</option>
              <option>Aave</option>
            </select>
          </div>)}
          {!load && activ.four && (<div style={{ "backgroundColor": "var(--dclight)" }} className='p-2 rounded-lg flex gap-4 max-sm:flex-col max-sm:text-sm max-sm:min-w-[200px]'><p className='inline text-white max-sm:hidden'>Choose two to analyise: </p>
            <select onChange={(e) => { setInput1(e.target.value); setInput(e.target.value + " " + input2) }} value={input1} style={{ "backgroundColor": "var(--dclight)" }} className='rounded-lg px-3 text-white border-none'>
              <option>Select</option>
              <option>Bitcoin</option>
              <option>Ethereum</option>
              <option>Dogecoin</option>
              <option>Litecoin</option>
              <option>Tron</option>
              <option>XRP</option>
              <option>Monero</option>
              <option>Stellar</option>
              <option>Binance coin</option>
              <option>Chainlink</option>
              <option>Cardano</option>
              <option>Cosmos</option>
              <option>Solana</option>
              <option>Polkadot</option>
              <option>Uniswap</option>
              <option>Aave</option>
            </select>
            <select onChange={(e) => { setInput2(e.target.value); setInput(input1 + " " + e.target.value) }} value={input2} style={{ "backgroundColor": "var(--dclight)" }} className='rounded-lg px-3 text-white border-none'>
              <option>Select</option>
              <option>Bitcoin</option>
              <option>Ethereum</option>
              <option>Dogecoin</option>
              <option>Litecoin</option>
              <option>Tron</option>
              <option>XRP</option>
              <option>Monero</option>
              <option>Stellar</option>
              <option>Binance coin</option>
              <option>Chainlink</option>
              <option>Cardano</option>
              <option>Cosmos</option>
              <option>Solana</option>
              <option>Polkadot</option>
              <option>Uniswap</option>
              <option>Aave</option>
            </select>
          </div>)}

          {!activ.one && (<button className={`h-[40px] w-[130px] ${css.btn}`} style={{ backgroundImage: "var(--prim)" }} type='submit'> <i className="fa-solid fa-paper-plane m-2"></i></button>)}
        </form>
      </div>
    </div>
  )
}

export default Chat