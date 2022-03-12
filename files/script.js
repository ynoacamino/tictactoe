const table =(()=>{
    let numberplayed = []
    let turneplayed, name1, name2, displey, player1, player2, i, end
    let btns = []
    let textWiner = document.createElement('div')
    let spanWiner = document.createElement('span')
    let borderWiner = document.createElement('div')

    const privmodule = {}
    privmodule.addinfo = (name)=>{
        return{name}
    }

    privmodule.changename = ()=>{
        name1 = document.getElementById('name1').value
        name2 = document.getElementById('name2').value
        player1 = privmodule.addinfo(name1)
        player2 = privmodule.addinfo(name2)
        if(numberplayed.length===0){
            privmodule.print(player1.name)
        }

    }

    privmodule.print = (jugador)=>{
        document.getElementById('displey').innerHTML = `Turno de: ${jugador}`
    }

    privmodule.marchName = ()=>{
        if(numberplayed.length%2===0){privmodule.print(player1.name)}else{privmodule.print(player2.name)} 
    }

    privmodule.march = (x)=>{
        if(numberplayed.length%2===0){turneplayed='X'}
        else{turneplayed='O'}
        document.getElementById(`${x}`).innerHTML= turneplayed
        numberplayed.push(null)
        privmodule.marchName()
    }
    
    privmodule.jues = (x)=>{
        if(end){return}
        if(document.getElementById(`${x}`).innerHTML === ''){
            return privmodule.march(x)}
    }

    privmodule.observer = ()=>{
        if(end){return}
        let botones = document.querySelectorAll('.scuare')
        botones.forEach(x=>{
            if(x.innerHTML === "X"){
                btns[x.id-1] = 1
            }else if(x.innerHTML === "O"){
                btns[x.id-1] = 2
            }else{btns[x.id-1] = 0}
        })


    }

    privmodule.waysToWin = ()=>{
        if(end){return}
        if(numberplayed.length%2===0){i = 2}else{i = 1}
        if(btns[0]===i && btns[1]===i && btns[2]===i){
            return true
        }else if(btns[3]===i && btns[4]===i && btns[5]===i){
            return true
        }else if(btns[6]===i && btns[7]===i && btns[8]===i){
            return true
        }else if(btns[0]===i && btns[3]===i && btns[6]===i){
            return true
        }else if(btns[1]===i && btns[4]===i && btns[7]===i){
            return true
        }else if(btns[2]===i && btns[5]===i && btns[8]===i){
            return true
        }else if(btns[0]===i && btns[4]===i && btns[8]===i){
            return true
        }else if(btns[2]===i && btns[4]===i && btns[6]===i){
            return true
        }
    }

    privmodule.printWiner = (player)=>{
        if(end){return}
        textWiner.classList.add('nowiner')
        textWiner.classList.add('winer')
        spanWiner.classList.add('spanwiner')
        borderWiner.classList.add('borderwiner')
        spanWiner.innerHTML = player
        borderWiner.append(spanWiner)
        textWiner.append(borderWiner)
        let body = document.querySelector('body')
        body.append(textWiner)
    }

    privmodule.winOrFail = ()=>{
        let winer
        if(numberplayed.length%2===0){winer = player2 }else{ winer =player1}
        let arrayEmpate = btns.filter(element => element!=0)
        if(privmodule.waysToWin()){
            privmodule.printWiner(`Gano ${winer.name}!`)
            privmodule.print("")
            end = true
            
        }
        if(arrayEmpate.length>=9){
            privmodule.printWiner("Empate :>")
            privmodule.print("")
            end = true     
        }
    }

    privmodule.reset = ()=>{
        end=false
        numberplayed = []
        btns = []
        let botones = document.querySelectorAll('button')
        botones.forEach((x)=>{
            x.innerHTML = ''
        })
        console.log(btns)
        textWiner.classList.remove('winer')
        spanWiner.classList.remove('spanwiner')
        borderWiner.classList.remove('borderwiner')
    }
    

//------------------------------------------------------------------

    const module ={}
    module.keyAndClickEnter = ()=>{
        privmodule.changename()
    }
    module.touch = (x)=>{
        privmodule.jues(x)
        privmodule.observer()
        privmodule.waysToWin()
        privmodule.winOrFail()
    }
    module.reinicio = ()=>{
        privmodule.reset()
    }

//------------------------------------------------------------------  
    return module

})()
table.keyAndClickEnter()

window.addEventListener('keydown',function(e){
    if(e.keyCode===13){
        table.keyAndClickEnter()
    }
})
window.addEventListener('click',function(e){
    table.keyAndClickEnter()
    if(e.srcElement.id >= 1 && e.srcElement.id <= 9){table.touch(e.srcElement.id)}
})

let btnmoon = document.querySelector(".moon")

btnmoon.onclick = function(){
    table.reinicio()
}