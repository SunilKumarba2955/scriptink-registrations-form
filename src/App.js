import { useState, useEffect } from 'react';
import './App.css';
import { db } from './Firebaseinit';
import { doc, collection, setDoc, updateDoc, onSnapshot, getDocs, query, where } from "firebase/firestore";

function App() {
  const [amount, setAmount] = useState(50);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [college, setCollege] = useState();
  const [usn, setUSN] = useState();
  const [year, setYear] = useState();
  const [branch, setBranch] = useState();
  const [referral, setReferral] = useState("");
  const [registered, setRegistered] = useState(true);
  const [inside, setInside] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (referral === 'SUNIL') {
      setAmount(amount - 49);
    }
    const formData = { firstName, lastName, email, phoneNumber, college, usn, year, branch, referral, amount, registered, inside }
    const ph = '+91' + String(phoneNumber);
    try {
      await setDoc(doc(collection(db, "registrations"), ph), formData );
      alert('Form submitted successfully');
      setAmount(50);
      setBranch('');
      setCollege('');
      setEmail('');
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setReferral('');
      setUSN('');
      setYear('');
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert('Error submitting form. Please try again.');
    } finally {
      setLoading(false); // Set loading to false after the form is submitted (whether successful or not)
    }
  }

  useEffect(() => {
    if (referral === 'SUNIL') {
      setAmount(amount - 49);
    } else {
      setAmount(50);
    }
  }, [referral]);


  // Validation part
  const [dataList, setDataList] = useState([]);
  const [dupEmail, setDupEmail] = useState(false);
  const [dupNumber, setDupNumber] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'registrations'));
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setDataList(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
  }, []);

  useEffect(() => {
    

    for(let i=0; i<dataList.length; i++) {
      if(email===dataList[i].email) {
        setDupEmail(true);
        return;
      } else {
        setDupEmail(false);
      }

    };

  }, [dataList, email]);

  useEffect(() => {
    
    for(let i=0; i<dataList.length; i++) {

      if(phoneNumber===dataList[i].phoneNumber) {
        setDupNumber(true);
        return;
      } else {
        setDupNumber(false);
      }

    };

  }, [dataList, phoneNumber]);
  


  return (
    <div className="App">
      <div className='heading' >Register to our Event</div>
      <form class="form" onSubmit={(e) => handleSubmit(e)} >
        <p class="title">Register </p>
        <p class="message">Please provide your details </p>
        <div class="flex">
          <label>
            <input class="input" type="text" value={firstName} placeholder="First Name" required={true} onChange={(e) => setFirstName(e.target.value)} />
          </label>

          <label>
            <input class="input" type="text" value={lastName} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
          </label>
        </div>

        <label>
          <input class="input" type="email" value={email} placeholder="Your Email" required={true} onChange={(e) => setEmail(e.target.value)} />
          <br />
          {dupEmail ? <span style={{color:'red'}}>This email is already registered</span> : null}

        </label>

        <label>
          <input class="input" type="number" value={phoneNumber} placeholder="Your phone number" required={true} onChange={(e) => setPhoneNumber(e.target.value)} />
          <br />
          {dupNumber ? <span style={{color:'red'}}>This number is already registered</span> : null}
        </label>

        <label>
          <input class="input" type="text" value={college} placeholder="Your College name" onChange={(e) => setCollege(e.target.value)} />
        </label>

        <label>
          <input class="input" type="text" value={usn} placeholder="USN" required={true} onChange={(e) => setUSN(e.target.value)} />
        </label>

        <label>
          <input class="input" type="text" value={branch} placeholder="Branch" required={true} onChange={(e) => setBranch(e.target.value)} />
        </label>

        <label>
          <input class="input" type="number" value={year} placeholder="Year" onChange={(e) => setYear(e.target.value)} />
        </label>

        <label>
          <input class="input" type="text" value={referral} placeholder="Any Referral?" onChange={(e) => setReferral(e.target.value)} />
        </label>

        <button className="submit" disabled={dupEmail || dupNumber || loading}>
          {loading ? 'Loading...' : `Pay now ₹${amount}`}
        </button>
      </form>
    </div>
  );


}

export default App;
