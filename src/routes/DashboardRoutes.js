import { Route, Routes } from "react-router"

import { Article } from "../components/articulos/Article"
import { ArtcileByName } from "../components/articulos/ArticleByName"
import { ArticlesByCategory } from "../components/articulos/ArticlesByCategory"
import { GetArticles } from "../components/articulos/ArticulosScreen"
import { PostArticulo } from "../components/articulos/PostArticulo"
import { PutArchivo } from "../components/articulos/PutArchivo"
import { UpdateArticle } from "../components/articulos/UpdateArticle"
import { Navbar } from "../components/ui/Navbar"



export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />

            <div className="container">
                <Routes>
                    {/* <Route path="/" element={<GetUsers />} />
                    <Route path="form" element={<FormApp />} /> */}
                    <Route path="/" element={ <GetArticles /> } />
                    <Route path="articles-category/:id" element={ <ArticlesByCategory /> } />
                    <Route path="article-by-name/" element={ <ArtcileByName /> } />
                    <Route path="articles/:id" element={ <Article /> } />
                    <Route path="post-articles" element={ <PostArticulo /> } />
                    <Route path="put-archivo/:id" element={ <PutArchivo /> } />
                    <Route path="update-articles/:id" element={ <UpdateArticle /> } />
                </Routes>

            </div>


        </>
    )
}
