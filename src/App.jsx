import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [count, setCount] = useState(0)
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const edithere = useRef()
  const [showfinished, setshowfinished] = useState(true)

useEffect(() => {
  let geted_todos = JSON.parse(localStorage.getItem("todos"))
  if (geted_todos.length != 0){

    settodos(geted_todos)
  }

}, [])


const save_to_localstorage = () => {
  localStorage.setItem("todos",JSON.stringify(todos))
}

 const hide = () => {
  setshowfinished(!showfinished)
 }
 
  const handleedit = async(e, id) => {
     let tahtobj = todos.filter((item) => {
      return item.id == id
      
    })
    edithere.current.value =await tahtobj[0].todo
    settodo(tahtobj[0].todo)
    edithere.current.focus()
    let newtodos = todos.filter((item) => {
      return item.id !== id
    })
    settodos(newtodos)
    save_to_localstorage()
  }
  const handledelete = async(e, id) => {

    let newtodos = todos.filter((item) => {
      return item.id !== id
    })
    // confirm("Are you sure ? (This todo will get deleted)")
     settodos(newtodos)
    save_to_localstorage()
  }
  const handleadd = () => {
    if (todo !== "") {
      settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
      save_to_localstorage()
      settodo("")
      
    }
   
    else {
      alert('Please do not make empty or copy to do')
    }
  }
  const handlechange = (e) => {
    settodo(e.target.value)

  }

  const handlecheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex((item) => {
      return item.id === id
    })

    let newtodos = [...todos]
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    settodos(newtodos)
    save_to_localstorage()
  }



  return (
    <>
      <Navbar />
      <div className="container bg-[#c178eb5a] text-black p-5 rounded-xl font-bold text-center text-xl my-5 mx-auto w-9/12 min-h-[80vh] max-sm:w-[93%] max-sm:px-[0.5rem] max-sm:min-h-[85vh]">

        <div className="py-4 addtodo w-[90%] mx-auto bg-white rounded-xl flex flex-col items-center ">
          <input onChange={handlechange} value={todo} className='my-4 font-medium border-b-2 border-[#264ee0] chota placeholder:text-[#6d747f] outline-none w-[60%] max-sm:w-[80%]' type="text" placeholder='What would you like to do?' ref={edithere} />
          <button onClick={handleadd} className='my-3 px-16 max-sm:px-10 hover:shadow-lg hover:shadow-[#ed6b5a79] py-1 font-semibold text-white hover:bg-[#e74f3b] active:bg-[#0088A9] bg-[#ED6A5A] rounded-lg'>Add</button>
        </div>


        <div className="yourtodo flex flex-col w-[90%] max-sm:w-full mx-auto">
          <h2 className=' font-bold text-2xl max-sm:text-xl my-3 bg-green-400 py-1 inline-block rounded-lg'>Your Todos</h2>
          <div className="show self-start max-sm:w-44 max-sm:text-md">Show Finished <input onChange={hide} value={`${setshowfinished}`} type="checkbox" name="" id="" /></div>
          <div className='todos overflow-y-scroll overflow-x-hidden max-h-[256px]'>
            {todos.length === 0 && <div className='mx-auto py-0.5 mt-2 rounded-lg bg-[#FEC400] '>No todos now!!</div>}
            {todos.map((item) => {
              return ( (showfinished || item.isCompleted) &&

                <div key={item.id} className="todo my-3 mx-auto flex justify-between bg-white rounded-lg items-center px-[6%] font-medium">
                  <input onChange={handlecheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                  <div className={item.isCompleted ? "line-through mx-4 chota" : "mx-4 chota"}>{item.todo}</div>
                  <div className="buttons flex gap-x-5 max-sm:gap-x-1">
                    <button onClick={(e) => { handleedit(e, item.id) }} className='my-3 px-2 hover:shadow-lg hover:shadow-[#ed6b5a79] flex py-1 font-semibold text-white hover:bg-[#e74f3b] active:bg-[#0088A9] bg-slate-800 rounded-lg'><span className="material-symbols-outlined">
                      edit_note
                    </span></button>
                    <button onClick={(e) => { handledelete(e, item.id) }} className='my-3 flex px-2 hover:shadow-lg hover:shadow-[#ed6b5a79] py-1 font-semibold text-white hover:bg-[#e74f3b] active:bg-[#0088A9] bg-slate-800 rounded-lg'><span className="material-symbols-outlined">
                      delete
                    </span></button>
                  </div>
                </div>

              )
            })}

          </div>

        </div>
      </div>
    </>
  )
}

export default App
