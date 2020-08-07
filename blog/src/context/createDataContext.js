import React, {useReducer} from 'react';

//actions é um objeto de ações
export default (reducer, actions, initialState) => { //cria uma função
    const Context = React.createContext(); //cria um contexto

    const Provider = ({children}) => {//cria um provider pra fornecer os dados
        const [state, dispatch] = useReducer(reducer, initialState);//gerenciador

        const boundActions = {}//ações vinculados ao objeto addBlog
       // console.log(actions)
        for(let key in actions){//varrendo os atributos do objeto => cada action
        //   console.log('keys:' ,key) //addblog
            
            //debugger
            boundActions[key] = actions[key](dispatch) //boundActions = {addBlog: anonymous}
          //  console.log(boundActions)
            //criando o atributo no bound e executando 
            //a addblog q retorna uma função anonima.. que ativa a action
            //actions.addBlog.dispatch()
           
        }
      //  console.log('bound ------------')
      //  console.log( boundActions)
        

        return <Context.Provider value={{state, ...boundActions}}>
            {children}
        </Context.Provider>
    }

    return {Context, Provider}
};