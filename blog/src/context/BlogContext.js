import createDataContext from './createDataContext'
import jsonServer from '../api/jsonServer'

//const BlogContext = React.createContext() //criou um contexto

const blogReducer = (state, action) => {
    switch(action.type){
        case 'add_blogpost':
            return [
                ...state, 
                {id : Math.floor(Math.random() * 99999),
                title: action.payload.title,
                content: action.payload.content
            }]
        case 'delete_blogpost': 
            return state.filter(blogpost => blogpost.id !== action.payload)
        case 'edit_blogpost':
            return state.map(blogpost => {
                return blogpost.id === action.payload.id 
                ? action.payload 
                : blogpost
            })
        case 'get_blogposts':
            return action.payload

        default: return state
    }
}

const getBlogPosts = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts')

        dispatch({type: 'get_blogposts', payload: response.data})
    }
}

const addBlogPost = dispatch =>  {
  ///  console.log('entrou no round 1')
    return async (title, content, callback) => {
        jsonServer.post('/blogposts', { title, content})
 //       console.log('entrou no round 2')
        // dispatch({type: 'add_blogpost', payload: {title, content}})
        if(callback){
            callback()
        }
    }
}

const deleteBlogPost = dispatch => {
    return async (id) => {
        await jsonServer.delete(`/blogposts/${id}`)
        dispatch({type: 'delete_blogpost', payload: id})
    }
}

//server
const editBlogPost = dispatch => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogposts/${id}`, {title, content})
        dispatch({type: 'edit_blogpost', payload: {id, title, content}})
        if(callback){
            callback()
        }
    }
}

// export const BlogProvider = ({children}) => {
//     const [blogPosts, dispatch] = useReducer(blogReducer, []);

//     const addBlogPost = () => {
//         dispatch({type: 'add_blogpost'})
//     }

//     //criou um fornecedor
//     return <BlogContext.Provider value={{data:blogPosts, addBlogPost: addBlogPost}}> 
//         {children}
//     </BlogContext.Provider>
// }

// export default BlogContext;

export const {Context, Provider} = createDataContext(
    blogReducer,
    {addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts},
    [])

    //{id: 1, title: 'Peaky Blinders', content: 'Sangue, apostas e navalhas'}