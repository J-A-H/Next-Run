import React from 'react';
const CourtCard = (props) => {
  return(
<div class="ui card">

  <div class="content">
    <div class="header">{props.court.name}</div>
    <div class="meta"><span class="date">{props.court.address}</span></div>
    <div class="description">Activity Level: HOT</div>
  </div>
  <div class="extra content">
  </div>
</div>
  )
  
}
  


export default CourtCard;