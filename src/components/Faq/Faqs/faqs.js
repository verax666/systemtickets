

const Faqs = () => {

    const faqs = [
        { name: "¿1.-?" },
        { name: "¿2.-?" },
        { name: "¿3.-?" },
        { name: "¿4.-?" },
        { name: "¿5.-?" },
        { name: "¿6.-?" },
        { name: "¿7.-?" },
        { name: "¿8.-?" },
        { name: "¿9.-?" },
        { name: "¿10.-?" },
    ];

    return (
        <ul>
            {faqs.map(item => <p key={item.name} >{item.name}</p>)}
        </ul>

    );
}
export default Faqs;