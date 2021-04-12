import React from 'react'
import StarRating from 'react-star-ratings'


export const showAverage=(p)=>{

    if(p&& p.ratings){
        let ratingArray=p && p.ratings;
        let total=[];
        let length=ratingArray.length

        ratingArray.map((r)=>total.push(r.star))
        let toatalReduced=total.reduce((p,n)=>p+n,0)
        let highest=length*5;

        let result =(toatalReduced * 5)/highest;

        
        return (
            <div className="text-center pt-1 pb-3">
           <span>
               <StarRating 
               rating={result}
               starRatedColor="red"    
                starDimension="20px"
                starSpacing="2px"
                editing={false}
               />
               ({length})
           </span>
            </div>
        )
    }

}