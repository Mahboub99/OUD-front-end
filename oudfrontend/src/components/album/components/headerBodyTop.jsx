import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from "react-router-dom";

/**
 * this is a component that renders the Top of the body of playlists, albums, likedSongs
 * on clicking the name of the owner it takes you to his/her profile
 * @author Ahmed Walid <ahmedwa1999@gmail.com>
 * @func
 * @param {string} title the title of playlists, albums
 * @param {string} owner the Id of the owner of playlists or albums. It is used to fetch his/her name from the database
 * 
 * @returns {
 *              <Router>
 *               <div>
 *                  <h2></h2>
 *                  <span></span>
 *                  <Link></Link> "A react router component"
 *               </div>
 *          </Router>
 *          }
 */
class HeaderBodyTop extends Component{
    constructor(props){
        super(props)
        this.state = {
            redirect : null,
            artists:[],
            flag :false
        }
        
    }
       
    componentWillReceiveProps(nextProps){
        this.setState({artists:nextProps.artists, flag:false})
    }
    redirect(route){
        this.setState({redirect:route})
    }
    withComma(artist){
        return(
        <span>, <button
            data-testid="artist" 
            className='playlistAnchor songButton'
            onClick={()=>this.redirect(`/artists/${artist.id}`)}>{artist.displayName}</button></span>
        );}
    withoutComma(artist){
        console.log(artist)
        return(<span> <button
            data-testid="artist"
            className='playlistAnchor songButton'
            onClick={()=>this.redirect(`/artists/${artist.id}`)}>{artist.displayName}</button></span>
        );}
    render(){   
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          } 
        return(
            <div data-testid="HeaderBodyTop" className='playlistHeaderBodyTop'>
                <h2 data-testid="title" className='gray-text'>{this.props.title}</h2>
                <span data-testid="credits" className="whiteText">By </span>
                {
                    
                    this.state.artists.map((artist)=>{
                        return(
                        this.state.flag ? this.withComma(artist):this.withoutComma(artist)
                        )}
                        )}
            </div>
        );
    }
}

HeaderBodyTop.propTypes = {
    title: PropTypes.string,
    artists:PropTypes.array
}

export default HeaderBodyTop;
