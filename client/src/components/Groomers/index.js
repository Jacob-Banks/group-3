import React, { useState } from "react";

const MeetTheGroomers = ({ options }) => {
    const [Groomers] =useState([
        {
            photo: '../../images/iStock-467571900-e1499441668456.jpeg',
            name: 'Jason Terry',
            bio: 'With over 21 years experience, Jason has combined a true passion and the artistic eye to drive him to be an exceptional and professional dog groomer.  In addition, he has mastered the patience in handling very difficult and/or nervous dogs with a soothing energy to bring some calmness to the overall grooming experience.  Jason takes much pride to ensure he is able to provide his professional services to the community and provide a higher level of personal care and attention to each client.  Jason resides in Caledon along with his wife, two kids, two dogs (Roxy the dachshund and Woody the GSP).'
        },
        {
            photo: '../../images/b602a8_711782e419e944df8e0b286ce6da1ba1_mv2.webp',
            name: 'Elizabeth Santon',
            bio: "Elizabeth has loved animals all of her life, always gravitating towards dogs even at a young age.  Growing up with cats and dogs, she eventually pursued dog training before transitioning into dog grooming.  Elizabeth draws upon her training background and understanding of dog behavior to assist her during the grooming process.  Elizabeth's professional background coupled with her naturally calm demeanor, gives her the ability to help keep dogs calm; specifically dogs who are aggressive and anxious.  Elizabeth will also be leading our dog training program and uses a balanced approach in achieving goals for pets, as well as working dogs.  Along with offering basic obedience training, she will be offering Intermediate and Advanced Therapy Dog preparation, and assist with service dog training.  Elizabeth lives in East Garafraxa with her spouse, service dog Layne, and three cats: Prudence, Maggie and Floyd... and fish."
        }
        
    ]);

    const groomers = Groomers.filter((opt) => opt.options === options);

    return(
        <div>
            <ul>
                <h2>Grommers</h2>
                {groomers.map((choice, i) => (
                    <div>
                        <img 
                        key={choice.photo}
                        src={choice.photo}
                        />
                        <h5 key={choice.name}>{choice.name}</h5>
                        <p key={choice.bio}>{choice.bio}</p>
                    </div>
                ))}
            </ul>
        </div>
    )
};
export default MeetTheGroomers;