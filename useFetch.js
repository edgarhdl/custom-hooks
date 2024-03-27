import { useState,useEffect } from "react"

const localCache = {};

const useFetch = ( url ) => {

    const [state, setState] = useState({
        data:null,
        isLoading : true,
        hasError: false,
        error : null
    })

    useEffect(() => {
        getFech();

      
    }, [url])

    const setLoadinState = () =>({
        data:null,
        isLoading : true,
        hasError: false,
        error : null
    });

    const getFech = async() =>{
        

        if (localCache[url]){
            console.log('usando cache');
            setState({
                data:localCache[url],
                isLoading:false,
                hasError:false,
                error:null
            })
            return;

        }
        setLoadinState();


        const resp = await fetch(url);

       // await new Promise( resolve => setTimeout(resolve,1500));


        if (!resp.ok){
            setState({
                data:null,
                isLoading:false,
                hasError:true,
                error: {
                    code: resp.error,
                    message: resp.statusText
                }
            });
            return;
        }
        const data = await resp.json();
        setState({
            data:data,
            isLoading:false,
            hasError: false,
            error :null
        });   
        localCache[url] = data;     
    }
    

    
    return{
        data:state.data,
        isLoading :state.isLoading,
        hasError: state.hasError
  }
}

export default useFetch
