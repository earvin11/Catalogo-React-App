import { Route, Routes } from "react-router"

import { Article } from "../components/articulos/Article"
import { ArtcileByName } from "../components/articulos/ArticleByName"
import { ArticlesByCategory } from "../components/articulos/ArticlesByCategory"
import { GetArticles } from "../components/articulos/ArticulosScreen"
import { PostArticulo } from "../components/articulos/PostArticulo"
import { PutArchivo } from "../components/articulos/PutArchivo"
import { PutLote } from "../components/articulos/PutLote"
import { UpdateArticle } from "../components/articulos/UpdateArticle"
import { Navbar } from "../components/ui/Navbar"
import { NewUser } from "../components/user/NewUser"
import { UpdatePassword } from "../components/user/UpdatePassword"




export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />

            <div className="container">
                <Routes>
                    {/* <Route path="/" element={<GetUsers />} />
                    <Route path="form" element={<FormApp />} /> */}
                    <Route path="/articles" element={ <GetArticles /> } />
                    <Route path="articles-category/:id" element={ <ArticlesByCategory /> } />
                    <Route path="article-by-name/" element={ <ArtcileByName /> } />
                    <Route path="article/:id" element={ <Article /> } />
                    <Route path="post-article" element={ <PostArticulo /> } />
                    <Route path="put-archivo/:id" element={ <PutArchivo /> } />
                    <Route path="put-lote/:id" element={ <PutLote /> } />
                    <Route path="update-article/:id" element={ <UpdateArticle /> } />
                    <Route path="register" element={ <NewUser /> } />
                    <Route path="update-password" element={ <UpdatePassword /> } />
                </Routes>

            </div>


        </>
    )
}
