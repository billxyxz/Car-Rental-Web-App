import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import BookingForm from "../Components/BookingForm"
import bg2 from "../assets/images/bg2.jpg"
import { faClockRotateLeft, faHandHoldingDollar, faHeadset } from "@fortawesome/free-solid-svg-icons"
import { getCars } from "../firebase"
import { Await, Link, defer, useLoaderData } from "react-router-dom"
import { Suspense } from "react"

export async function homeloader(){
  const data = await getCars();
  return defer({data: data});
}

const Home = () => {
  const loaderData = useLoaderData()

  return (
    <section 
    className="w-full min-h-screen">
      <section
      style={{
        backgroundImage: `url(${bg2})`
        }}
      className="relative w-full h-[90vh] max-h-[754px] bg-cover bg-center bg-no-repeat px-7 sm:px-20 pt-32 after:w-full after:h-full"
      >{/*Hero Section */}
        <article className=" text-gray-900 mb-8">
          <h3 className=" capitalize text-2xl md:text-4xl md:leading-relaxed leading-normal font-['Raleway'] font-medium mb-2">Why wait in line when you<br/> can book your<br/><span className=" font-bold">rental car online?</span></h3>
          <p className=" tracking-wide font-['Inter']">Rent a car at your fingertips, no extra charges.</p>
        </article>
        <BookingForm />
      </section>
      <section className="text-center p-16 px-7 sm:px-20">{/*Offers */}
      <h3 className="text-3xl sm:text-4xl font-extrabold font-['Inter'] mb-4">Why <span className="text-[#4477CE]">Choose</span> Us?</h3>
      <p className=" max-w-xl mx-auto font-['rubik'] text-sm text-gray-700">Bill Car Rental is a reputable car rental company that offers a wide selection of vehicles for various transportation needs.</p>
      <div className=" mt-10 w-full flex flex-col md:flex-row gap-7 justify-between items-center">{/*flex of offers */}
        <div className="flex flex-col items-center justify-center p-4 w-[290px] text-center">
            <FontAwesomeIcon 
            icon={faClockRotateLeft}
            className="text-7xl text-[#4477CE] mb-6"
            />
            <h5 className=" text-xl font-bold font-['Inter'] mb-2">24/7 Support</h5>
            <p className="font-['rubik'] text-sm">We have a dedicated customer support team available to assist and emergency support.</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 w-[290px] text-center md:mt-28">
            <FontAwesomeIcon 
            icon={faHeadset}
            className="text-7xl text-[#4477CE] mb-6"
            />
            <h5 className=" text-xl font-bold font-['Inter'] mb-2">Corporate Services</h5>
            <p className="font-['rubik'] text-sm">We provide tailored solutions for corporate clients, offerring rental plans for business travel needs.</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 w-[290px] text-center">
            <FontAwesomeIcon 
            icon={faHandHoldingDollar}
            className="text-7xl text-[#4477CE] mb-6"
            />
            <h5 className=" text-xl font-bold font-['Inter'] mb-2">Reasonable Rates</h5>
            <p className="font-['rubik'] text-sm">We have a dedicated customer support team available to assist and emergency support.</p>
        </div>
      </div>
      </section>
      <section className="p-16 px-7 sm:px-20">
        <article className="w-full flex justify-between">
        <h3 className="text-3xl sm:text-4xl font-extrabold font-['Inter'] mb-4">HighLight Vehicles</h3>
        <Link className=" font-medium font-['Roboto'] underline underline-offset-2" to="fleet">View All</Link>
        </article>
        <div 
        className="flex flex-wrap items-center justify-center md:justify-start gap-9 py-8">
          <Suspense
          fallback={<div className="w-full min-h-screen flex justify-center items-center"><h3 className="text-2xl font-medium tracking-widest animate-pulse">Loading...</h3></div>}
          >
            <Await
            resolve={loaderData.data}
            >
              {
                (loadedCars) => {
                  const highlightCars = loadedCars.filter(car => car.tag == "trendy")
                  return (
                   highlightCars.map(car => {
                      return (
                        <div key={car.id} className=" w-[300px] bg-white shadow rounded-sm">
                          <div className="w-full h-[200px] object-center object-cover overflow-hidden">
                            <img src={car.link} alt="" className="w-full h-full" />
                          </div>
                          <article className="p-8 w-full bg-gray-50">
                            <h4 className=" text-xl font-semibold">{car.model}</h4>
                            <p className=" font-semibold">${car.price}/day</p>
                            <button className="capitalize px-4 py-2 bg-gray-900 text-gray-50 rounded-full mt-3">book now</button>
                          </article>
                        </div>
                      )
                    })
                  )
                }
              }
            </Await>
          </Suspense>
        </div>
      </section>
    </section>
  )
}
export default Home