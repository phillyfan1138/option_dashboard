export const keepMiddleElements=(arr, perc1, perc2)=>{
    const n=arr.length
    const m1=Math.floor(perc1*n)
    const m2=Math.floor(perc2*n)
    return arr.slice(m1, -m2)
}

export const getMiddleByVal=(arr, lower, upper, key)=>{
    return arr.filter(val=>val[key]>lower&&val[key]<upper)
}
//.00000001 is to fix the rounding errors that sometimes happen
const roundErr=.00000001
export const createArray=(init, last, by=1)=>{
    let arr=[]
    const n=Math.floor(roundErr+(last-init)/by)
    for(let i=0; i<(n+1); ++i){
        const val=init+by*i
        arr.push(val)        
    }
    return arr
}
//TODO!! Write unit test for this and maybe rename
export const extractDefaultValues=(parameters, defaultKey)=>parameters.reduce((aggr, curr)=>({...aggr, [curr.key]:curr[defaultKey]}), {})


const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))))

export const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a)

export const excludePotentialArray=(maybeArr, maybeInArr)=>maybeArr?maybeArr.indexOf(maybeInArr)===-1:true

export const removeFirstAndLastElement=arr=>arr.slice(1, -1)

export const upperFirstLetter=string=>string[0].toUpperCase() + string.substring(1)

