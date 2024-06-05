import { useState, useEffect } from 'react';

function BloodDetails() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1)); 
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
  };

  const bloodTypes = [
    { type: 'A+', description: 'Compatible with A+ and AB+. Can donate to A+, A-, AB+, and AB-' },
    { type: 'A-', description: 'Compatible with A- and AB-. Can donate to A- and AB-' },
    { type: 'B+', description: 'Compatible with B+ and AB+. Can donate to B+, B-, AB+, and AB-' },
    { type: 'B-', description: 'Compatible with B- and AB-. Can donate to B- and AB-' },
    { type: 'O+', description: 'Compatible with all blood types. Can donate to A+, A-, B+, B-, AB+, AB-, and O+' },
    { type: 'O-', description: 'Universal blood donor. Can donate to all blood types.' },
    { type: 'AB+', description: 'Universal plasma donor. Can donate to AB+.' },
    { type: 'AB-', description: 'Universal red blood cell donor. Can donate to all Rh-negative blood types.' },
  ];

  const awarenessItems = [
    { title: 'Blood Donation Saves Lives', description: 'Every blood donation can save up to three lives. By donating blood, you can help patients in need of transfusions due to accidents, surgeries, or medical conditions.' },
    { title: 'Regular Blood Donations Help Prevent Anemia', description: 'Regular blood donations help maintain healthy iron levels in the body, reducing the risk of anemia. Anemia is a condition where the blood lacks enough healthy red blood cells to carry adequate oxygen to the body’s tissues.' },
    { title: 'Blood Donation Can Reduce the Risk of Cancer', description: 'Some studies suggest that donating blood can reduce the risk of cancer. By donating blood regularly, you can lower iron levels in the body, which may reduce the risk of certain cancers.' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center text-white">Why Donate Blood?</h1>
      <div id="default-carousel" className="relative w-full" data-carousel="slide">
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          <div className={`duration-700 ease-in-out ${slideIndex === 0 ? 'block' : 'hidden'}`} data-carousel-item>
            <img src="/images/blood_donation_1.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Slide 1" />
          </div>
          <div className={`duration-700 ease-in-out ${slideIndex === 1 ? 'block' : 'hidden'}`} data-carousel-item>
            <img src="/images/blood_donation_2.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Slide 2" />
          </div>
          <div className={`duration-700 ease-in-out ${slideIndex === 2 ? 'block' : 'hidden'}`} data-carousel-item>
            <img src="/images/blood_donation_3.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Slide 3" />
          </div>
        </div>
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          {[...Array(3)].map((_, i) => (
            <button
              key={i}
              type="button"
              className={`w-3 h-3 rounded-full ${slideIndex === i ? 'bg-blue-500' : 'bg-gray-300'}`}
              aria-current={slideIndex === i ? 'true' : 'false'}
              aria-label={`Slide ${i + 1}`}
              data-carousel-slide-to={i}
            ></button>
          ))}
        </div>
        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={prevSlide}
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={nextSlide}
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
      <h1 className="text-4xl font-bold mb-4 mt-8 text-center text-white">Blood Groups</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {bloodTypes.map((bloodType, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">{bloodType.type}</h2>
            <p>{bloodType.description}</p>
          </div>
        ))}
      </div>
      <h1 className="text-4xl font-bold mb-4 mt-8 text-center text-white">Awareness</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {awarenessItems.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BloodDetails;
