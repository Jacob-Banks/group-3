import React, { useState } from "react";
//import { Modal } from "../Modal/Modal";
//import { GlobalStyle } from "../globalStyles";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_GROOMER, UPDATE_SHOWMODAL } from "../../utils/actions";

const MeetTheGroomers = ({ options }) => {
  const [state, dispatch] = useStoreContext();
  const { showModal } = state;
  const [Groomers] = useState([
    {
      photo: "../../images/iStock-467571900-e1499441668456.jpeg",
      name: "Jason Terry",
      bio: "With over 21 years experience, Jason has combined a true passion and the artistic eye to drive him to be an exceptional and professional dog groomer.  In addition, he has mastered the patience in handling very difficult and/or nervous dogs with a soothing energy to bring some calmness to the overall grooming experience.  Jason takes much pride to ensure he is able to provide his professional services to the community and provide a higher level of personal care and attention to each client.  Jason resides in Caledon along with his wife, two kids, two dogs (Roxy the dachshund and Woody the GSP).",
    },
    {
      photo: "../../images/b602a8_711782e419e944df8e0b286ce6da1ba1_mv2.webp",
      name: "Elizabeth Santon",
      bio: "Elizabeth has loved animals all of her life, always gravitating towards dogs even at a young age.  Growing up with cats and dogs, she eventually pursued dog training before transitioning into dog grooming.  Elizabeth draws upon her training background and understanding of dog behavior to assist her during the grooming process.  Elizabeth's professional background coupled with her naturally calm demeanor, gives her the ability to help keep dogs calm; specifically dogs who are aggressive and anxious.  Elizabeth will also be leading our dog training program and uses a balanced approach in achieving goals for pets, as well as working dogs.  Along with offering basic obedience training, she will be offering Intermediate and Advanced Therapy Dog preparation, and assist with service dog training.  Elizabeth lives in East Garafraxa with her spouse, service dog Layne, and three cats: Prudence, Maggie and Floyd... and fish.",
    },
    {
      photo: "../../images/groomer-clipping-dogs-nails_jpeg-600x390.jpeg",
      name: "Viviane Curry",
      bio: "Viviane has always had a love for animals. After a 15 year career in the IT industry, she decided to follow her passion and opened a successful dog walking and pet sitting company. Through the services she provided, Viviane gained invaluable experience handling and caring for a variety of dogs with different personalities and behaviors. Viviane now brings that handling experience to her grooming. Viviane shows each dog patience and understanding during the grooming process and treats each one like it was her own. Viviane lives in Schomberg with her daughter and two dogs Milo and India.",
    },
    {
      photo: "../../images/Dog-Grooming.jpeg",
      name: "Marie France",
      bio: "Marie has had a lifelong love for animals, and now after a full career in the Tech Industry, she can finally fulfill her passion to work with clients of the 'fluffy' variety.  Marie is passionate about big and small animals (she cannot pass one by without giving them love and affection!) It is this passion that makes Marie an asset to the team. Marie is also a devoted pet owner, which helps her connect with your pets needs.  Marie currently resides in Fergus with her Family and her cat Shadow. ",
    },
  ]);
  const openModal = (e) => {
    const { param } = e.target.dataset;

    let person = Groomers[param].name;

    dispatch({ type: UPDATE_GROOMER, groomer: person });
    dispatch({ type: UPDATE_SHOWMODAL, showModal: !showModal });

    //console.log(state.groomer);
  };

  const groomers = Groomers.filter((opt) => opt.options === options);

  return (
    <>
      <div>
        <ul>
          <h2>Grommers</h2>
          {groomers.map((choice, i) => (
            <div>
              <img key={choice.photo} src={choice.photo} />
              <h5 key={choice.name}>{choice.name}</h5>
              <p key={choice.bio}>{choice.bio}</p>

              <button data-param={JSON.stringify(i)} onClick={openModal}>
                Click here to Book with {choice.name}
              </button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};
export default MeetTheGroomers;
