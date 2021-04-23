import Link from 'next/link';

export default function Banner(props){
    return <div id="Banner" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#Banner" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
    <button type="button" data-bs-target="#Banner" data-bs-slide-to={1} aria-label="Slide 2" />
    <button type="button" data-bs-target="#Banner" data-bs-slide-to={2} aria-label="Slide 3" />
  </div>
  <div className="carousel-inner">
      {props.images.map((data,key)=>(
        <div key={key} className={key == 0?"carousel-item active":"carousel-item"}>
          <Link href={data.href}><img src={data.src} className="d-block w-100" alt="Image" /></Link>
        </div>
      ))} 
  </div>
  {props.indicator?<button className="carousel-control-prev" type="button" data-bs-target="#Banner" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>:<></>}
  {props.indicator?<button className="carousel-control-next" type="button" data-bs-target="#Banner" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>:<></>} 
</div>

}