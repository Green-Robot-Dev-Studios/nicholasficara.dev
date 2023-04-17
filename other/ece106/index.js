// bullying me for the code quality is not permitted
// I whipped this pile of steaming garbage up in 2 hours.

import renderMathInElement from "https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/contrib/auto-render.mjs";

const problems = {
    7: [
        {
            question:
                "A conducting sphere of radius “a” is surrounded by a very thin conducting spherical shell of radius “b”. Charge +Q is released on the shell (at r=b). The conducting sphere (at r=a) is then grounded. What can be said about the charge on the conducting sphere (at r=a)?",
            answers: [
                "There is negative charge on the sphere with magnitude < Q.",
                "There is negative charge on the sphere with magnitude > Q.",
                "There is positive charge on the sphere, but we can't say anything about the magnitude without full calculations.",
                "There is -Q charge on the sphere.", "There is no charge on the sphere as it is grounded"],
            why: "",
            image: "",
        },
        {
            question:
                "Charge is fixed inside a cavity inside a conducting spherical shell. The charge is not at the center. By measuring the Electric field distribution around the conductor carefully, we should be able to find the location of the charge accurately.",
            answers: ["False", "True"],
            why: "The charge is uniform on the outside of the conductor, so there is no way to tell the position of the charge inside.",
            image: "",
        },
        {
            question:
                "Consider a charge placed inside a spherical conductor as shown in the figure below. Grey areas are the conductors while white areas are free space. What can we say about E-field in the region marked by the blue arrow?",
            answers: [
                "E is 0 in the region",
                "There will be E field in the region but it will not be uniform due to the asymmetry in the shape created by the gap.",
                "E-field there will be due to +q induced charge pointing out.",
                "E-field there will be due to -q induced charge pointing in.",
            ],
            why: "E field in a conductor with no internal charge is 0.",
            image: "1.png",
        },
        {
            question:
                "Charge Q is fixed inside a cavity inside a conductor of arbitrary shape. The conductor is grounded. What will be the flux for a Gaussian closed surface outside the conductor?",
            answers: [
                "0",
                "-Q",
                "Q",
                "It will depend upon the shape of the conductor.",
            ],
            why: "Since the conductor is grounded, the flux will be 0.",
            image: "",
        },
        {
            question:
                "You are caught in a thunderstorm and observe that at the passage of very, very large thundercloud overhead a vertical Electrical flux density pointing downwards with strength of $D_0$ V/m is created. How much charge (in terms of Coulombs/m2) does  the thundercloud contain? Assume that the earth is a perfect conductor.",
            answers: [
                "$D_0$",
                "$D_0/2$",
                "$-D_0/2$",
                "$-2D_0$",
                "$2D_0$",
                "None of the above",
            ],
            why: "",
            image: "",
        },
        {
            question:
                "A positively charged metal sphere A is brought into contact with an uncharged metal sphere B. As a result:",
            answers: [
                "Both A and B are positively charged.",
                "A is positively charged; B has negative and positive charges on different parts of its surfaces with the total being 0.",
                "A becomes neutral, B is positively charged.",
                "A is positively charged, while B is negatively charged.",
                "None of the above.",
            ],
            why: "Some of the charge on A is transferred to B.",
            image: "",
        },
        {
            question:
                "We have four conducting plates placed next to each other. Charges are released into the plates as shown in the figure. After the charges are released and equilibrium achieved, two of the plates are connected together by the conductor as shown by the dashed line. How does the charge flow from one conductor to the other?",
            answers: [
                "Charge will flow from the conductor on the left to the conductor on the right.",
                "No charge will flow since the two conductors have the same value of charge.",
                "Charge will flow from the conductor on the right to the conductor on the left.",
                "No charge will flow since the conductors are at the same potential.",
            ],
            why: "No idea. Hmu if you know. :)",
            image: "2.png",
        },
        {
            question:
                "A conductor has two cavities inside it. One of the cavities has charge Q fixed inside the cavity as shown in the figure below. What is the electric field inside the other cavity?",
            answers: [
                "0",
                "It will be field due to charge +Q on its surface.",
                "We cannot determine the field without knowing the exact shape of the cavities and the conductor.",
                "It will be field due to charge -Q on its surface",
            ],
            why: "Zero because there is no enclosed charge. Just draw a gaussian surface around the cavity. Remember there can't be any charge in the conductor.",
            image: "3.png",
        },
        {
            question:
                "Two conducting sheets separated by a distance are connected together by a very thin wire as shown in the figure below. Between them is another conductor. The distance a > b. Positive charge +Q is released in the middle conductor. What can be say about charge density on the surfaces A and B of middle conductor?",
            answers: [
                "surface B has lower charge density as surface A; both are positive.",
                "one surface will have positive charge density; while another surface will have negative charge density but we cannot tell without calculations.",
                "surface B has higher charge density than surface A; both are positive.",
                "surface B has the same charge density as surface A; both are positive.",
            ],
            why: "Check problem 5 in chapter 7.",
            image: "4.png",
        },
        {
            question:
                "A charge Q sits outside a hollow conducting sphere, A as shown in the figure below. What is the value of Electric field at point P?",
            answers: [
                "0",
                "Cannot be easily calculated",
                "None of the options",
                "$\\frac{kQ}{R^2}$, where R is the distance from q to the origin.",
                "$\\frac{kQ}{R^2}$, where R is the distance from q to P.",
            ],
            why: "No electric field in a conductor.",
            image: "5.png",
        },
        {
            question:
                "A positive charge is placed inside a spherical conducting shell with inner radius a and outer radius b. The charge is placed at shifted position relative to the center of the shell. Describe the charge distribution induced at the shell surfaces.",
            answers: [
                "A negative charge with non-uniform surface density will be induced on the inner surface, a positive charge with uniform surface density will be induced on the outer surface.",
                "A negative charge with uniform surface density will be induced on the inner surface, a positive charge with uniform surface density will be induced on the outer surface.",
                "A negative charge with uniform surface density will be induced on the inner surface, a positive charge with non-uniform surface density will be induced on the outer surface.",
                "A positive charge with non-uniform surface density will be induced on the inner surface, a positive charge with non-uniform surface density will be induced at the outer surface",
                "None of the options.",
                "A positive charge with uniform surface density will be induced on the inner surface, a negative charge with uniform surface density will be induced on the outer surface.",
            ],
            why: "When a charge is in a cavity, inner is non-uniform and opposite, while outer is uniform and same. Saini has a superb explanation of this in his chapter notes.",
            image: "",
        },
        {
            question:
                "A thin conducting spherical shell of radius R has a charge Q which is uniformly distributed on its surface. The correct plot for electrostatic potential due to this spherical shell is:",
            answers: ["6.2.png", "6.1.png", "6.3.png", "6.4.png"],
            why: "Voltage is equal across a conductor",
            image: "",
        },
        {
            question:
                "We have a conducting disk of radius R which is very thin. Charge Q is released on the disk. What would the charge density look like?",
            answers: [
                "It will be non-uniform with higher charge density closer to the edge of the disk.",
                "It will be uniform on the disk.",
                "It will be non-uniform but the function will not be monotonic with radius.",
                "It will be non-uniform with higher charge density closer to the center.",
            ],
            why: "It's not a sphere. Can't make assumptions. Just memorize this. Also comes up when we consider objects with *sharp* (aka edge of a disk) edges.",
            image: "",
        },
        {
            question:
                "In the figure below, the shaded regions are two spherical conducting shells. Two point charges are located at the positions marked in the figure. The point charge inside is off-centered. What is the induced charge on the surface marked in the figure.",
            answers: [
                "+q, uniform",
                "-q, uniform",
                "+q, non-uniform",
                "0",
                "+2q, uniform",
                "-q, non-uniform",
            ],
            why: "I'm not entirely sure, but this is my understanding. The charge outside doesn't do anything to the inner system. From the inner system, we see that the inner-inner surface is non-uniform -q, and the inner-outer surface is uniform +q.",
            image: "7.png",
        },
        {
            question:
                "When a charge is released on the inner surface of a hollow conducting sphere, all of the added charge will move to and redistribute into the inner layer of the conducting sphere.",
            answers: ["False", "True"],
            why: "It also goes on the outside layer.",
            image: "",
        },
        {
            question:
                "A conducting spherical shell of radius R1 has charge Q distributed on it. It is surrounded by another conducting spherical shell of larger radius R2 with charge -Q distributed on it. The outer shell is then grounded. What happens to the charge on the outer shell?",
            answers: [
                "Nothing changes",
                "The charge on the outer shell becomes -Q on the inner surface and +Q on the outer surface",
                "The charge on the outer shell becomes 0 since it is grounded.",
                "The charge on the outer shell becomes +Q",
                "None of the options",
            ],
            why: "Brenda said to understand this question for the final. I don't get it. Hmu if you know.",
            image: "",
        },
        {
            question:
                "A chunk of conductor with arbitrary shape has a hollowed out core. We place charge on it until the potential on the outside surface is V0 with respect to infinity. What is the potential inside the cavity?",
            answers: [
                "$V_0$",
                "0",
                "$2V_0$",
                "$\\frac{V_0}{2}$",
                "We cannot tell since we don't know the shape of the conductor or the cavity",
            ],
            why: "Conductors don't change potential on their own.",
            image: "8.png",
        },
        {
            question:
                "A conducting spherical shell of radius R1 has charge Q distributed on it. It is surrounded by another conducting shell of larger radius R2 with charge -Q distributed on it. The inner shell is then grounded. What happens to the charge on the inner shell?",
            answers: [
                "The charge reduces but still remains positive",
                "The charge increased from the initial value of Q.",
                "The charge becomes 0 since it is grounded.",
                "The charge becomes negative.",
                "Nothing changes.",
            ],
            why: "",
            image: "",
        },
        {
            question:
                "A diagram of an irregularly shaped conductor is shown below. Four locations on the surface (A-D) are shown below. Charge Q is released into the conductor. Rank these locations in increasing order of the local electric field strength.",
            answers: [
                "B, C, D, A",
                "A, B, C, D",
                "D, A, C, B",
                "A, D, C, B",
                "None of the options",
            ],
            why: "It suffices to look at point a. Sharp points are always highest electric field strength.",
            image: "9.png",
        },
        {
            question: "Two equal charges, spherical in shape, are strung from a spring from a single pivot point. A conductor is introduced below. There is no excess free on the conductor. What happens to the equilibrium?",
            answers: [
                "The charges come closer", 
                "The charges separate further", 
                "Nothing happens", 
                "Not enough information is given",
            ],
            why: "Chapter 7 slide 27",
            image: "",
        },
        {
            question: "A point charge +Q is brought near a thin conducting hollow sphere of radius L that has charge +Q originally distributed uniformly on its surface. Which of these statements below are true statements for E-field at points A and B due to the point charge and spherical charge?",
            answers: [
                "The E-field is non-zero at A but 0 at B", 
                "The E-field is 0 at A but non-zero at B", 
                "The E-field is 0 at both A and B", 
                "The E-field is non-zero at both A and B",
                "Impossible to answer"
            ],
            why: "Chapter 7 slide 33",
            image: "16.png",
        },
        {
            question: "Two charged conducting spheres, A and B, have different radii, a=1 and b=4 units, and are connected by a thin conducting wire of negligible charge. What is the ratio of the charge on each sphere, Qa/Qb. Assume the spheres are so far apart that they only interact via the wire.",
            answers: [
                "Qa/Qb= ¼", 
                "Qa/Qb= 1", 
                "Qa/Qb= 1/16 ", 
                "Qa/Qb= 16",
                "Qa/Qb= 4"
            ],
            why: "Chapter 7 slide 34",
            image: "16.png",
        },
    ],
    8: [
        {
            question: "Consider two dielectrics of electric permittivity ϵ1 and ϵ2 next to each other. There is no free charge at the boundary and ϵ2 > ϵ1, Electric field is incident on the boundary at an angle θ1 with respect to the normal in the first dielectric. What will the angle θ2 be in the second dielectric?",
            answers: [
                "$\\theta_1 > \\theta_2$", 
                "$\\theta_1 < \\theta_2$", 
                "$\\theta_1 = \\theta_2$", 
            ],
            why: "",
            image: "",
        },
        {
            question: "A dielectric is kept in a time varying magnetic field. Choose the correct option.",
            answers: [
                "There is no induced voltage but there is an induced electric field.", 
                "There is neither an induced voltage nor an induced electric field.",
                "There is an induced voltage and an induced electric field.",
                "There is an induced voltage but no induced electric field."
            ],
            why: "",
            image: "",
        },
    ],
    9: [
        {
            question: "A parallel plate capacitor is connected to a battery. We then pull the plates apart such that the spacing between the plates increases. What happens to the stored energy in the capacitor?",
            answers: [
                "We do negative work, battery does positive work and the stored energy decreases.", 
                "We do negative work, battery does negative work and the stored energy decreases.", 
                "We do positive work, battery does positive work and the stored increases. ", 
                "We do positive work, battery does negative work and the stored energy does not change.",
            ],
            why: "",
            image: "",
        },
        {
            question: "Three capacitors are connected in series with each other. What can be said for certain about the total capacitance?",
            answers: [
                "The total capacitance is smaller than the smallest individual capacitor", 
                "The total capacitance is larger than the largest individual capacitor. ",
                "The total capacitance is geometric mean of the 3 capacitances.",
                "The total capacitance is the arithmetic mean of the 3 capacitances."
            ],
            why: "",
            image: "",
        },
        {
            question: "A parallel plate capacitor is connected to a DC battery. The plates are then pulled apart mechanically such that the distance between them increases. As the plates are being pulled apart, in which direction will the current flow?",
            answers: [
                "Current flows from the plate with the positive charge to the battery", 
                "Current flows from the plate with the negative charge to the battery. ",
                "Current flows from the battery to the plate with the positive charge",
                "There is no current flow as the battery is DC and capacitors don't allow current to flow in DC."
            ],
            why: "",
            image: "",
        },
        {
            question: "A parallel plate capacitor is initially charged to Q and then the battery is removed. The separation between the two plated is then decreased from initial d to d/2. By what factor does the stored potential energy change in the capacitor?",
            answers: [
                "The potential energy becomes half. ", 
                "The potential energy doubles.",
                "The potential energy decreased but we cannot tell by how much.",
                "The potential energy increases but we cannot tell by how much.",
                "No change"
            ],
            why: "",
            image: "",
        },
    ],
    10: [
        {
            question: "Two identical finite length wires are spaced a distance \"d\" apart. They carry the same current I but in opposite directions. The magnitude of the magnetic field, B, at a point on the axis midway between the wires is:",
            answers: ["Double the value as that produced by a single wire", "0", "The same as that produced by a single wire", "Half of that as produced by a single wire"],
            why: "Right hand rule: thumb along current and fingers around magnetic field.",
            image: "",
        },
        {
            question: "Consider two circular rings of copper wire. One ring is twice in radius as compared to the other. The current in the ring is driven by voltage sources with the same voltage. How do the magnetic fields at the center of the two rings compare with each other? Resistance is linearly proportional to length of a conductor.",
            answers: [
                "The field for the smaller ring is four times as large as field for the larger ring",
                "The magnitude of the two fields are the same.", 
                "None of the options.", 
                "The field for the smaller ring is twice as large as field for the larger ring", 
                "The field for the larger ring is twice as large as the field for the smaller ring.",
            ],
            why: "",
            image: "",
        },
        {
            question: "The magnetic field at point P is equal to:",
            answers: [
                "That of one infinite wire and a semicircle",
                "That of two infinite wires and a semicircle", 
                "None of the options.", 
                "That of a semicircle", 
                "That of the difference of an infinite wire and the semicircle.",
            ],
            why: "",
            image: "10.png",
        },
        {
            question: "A current I runs along an arbitrarily shaped wire that connects two given points as shown in the figure. The wire need not lie in the same plane. The magnetic field at a very far away location from the wire will be:",
            answers: [
                "Field will be the same as if the current was traveling in a straight line from A to B.", 
                "We cannot calculate the field till the shape of the wire is given", 
                "Very difficult to calculate and will have to setup a complex vector integral with Biot-Savart Law", 
                "Zero, fields due to different loops will cancel each other out",
            ],
            why: "",
            image: "11.png",
        },
        {
            question: "Two parallel rings have the same axis and are separated by a very small distance \"d\". They have the same radius, a, and they carry the same current I but in opposite directions. What is the magnetic field midway between the two rings on the axis of the rings?",
            answers: [
                "Zero", 
                "Double that of a single loop", 
                "Half that of a single loop", 
                "Fields will add up but will be less than the value at the center of one ring.",
                "Fields will add up and will be more than the value at the center of one ring.",
            ],
            why: "",
            image: "",
        },
        {
            question: "What does Gauss Law of Magnetostatics physically mean?",
            answers: [
                "There are no magnetic monopoles in the classical world.", 
                "Magnets are sources of magnetic fields", 
                "Current is a source of magnetic fields", 
                "It is just a mathematical equation with no physical interpretation.",
            ],
            why: "",
            image: "",
        },
        {
            question: "The field at point P due to the circuit below will be (+z direction is pointing out of the page):",
            answers: [
                "Subtraction of the field due to arc at radius \"a\" and arc at radius \"b\" and will point in -z direction", 
                "Sum of field due to arc at radius \"a\", arc at radius \"b\", and straight parts of the wires pointing in +z direction.", 
                "Sum of field due to arc at radius \"a\", arc at radius \"b\", and straight parts of the wires pointing in -z direction.", 
                "Subtraction of the field due to arc at radius \"a\" and arc at radius \"b\" and will point in +z direction",
                "None of the options.",
            ],
            why: "",
            image: "",
        },
        {
            question: "Which of the following is not a source of magnetostatic fields (B field which does not vary with time)?",
            answers: [
                "An accelerating charge", 
                "A DC current in a wire", 
                "A permanent magnet", 
                "DC current in a closed loop.",
            ],
            why: "",
            image: "",
        },
        {
            question: "Suppose you have a wire that is a square loop and carrying current I. At the centre of the square (i.e. equidistant from the wires), the magnetic field will be zero.",
            answers: [
                "False", 
                "True", 
            ],
            why: "",
            image: "",
        },
        {
            question: "A compass needle is already deflected at an angle. If you have a charge that is moving close to this compass, the needle cannot deflect any further.",
            answers: [
                "False", 
                "True", 
            ],
            why: "",
            image: "",
        },
        {
            question: "When applying the Biot-Savart Law, dl should be chosen to be along the current I.",
            answers: [
                "True", 
                "False", 
            ],
            why: "",
            image: "",
        },
        {
            question: "Like the Electric field, the net magnetic field inside the conductor must be 0.",
            answers: [
                "False", 
                "True", 
            ],
            why: "",
            image: "",
        },
        {
            question: "A cone has charge uniformly distributed on its surface, and it is not rotating or moving. What is the direction of the B-field at the apex of the cone?",
            answers: [
                "0", 
                "Pointing Left", 
                "Pointing CW", 
                "Pointing Right",
                "Pointing Down (Towards Base of Cone)",
                "Pointing Up (Towards Tip of Cone)",
                "Pointing CCW",
            ],
            why: "",
            image: "",
        },
        {
            question: "The magnetic field at Point C in the following diagram is:",
            answers: [
                "Pointing out of the screen.", 
                "Pointing up.", 
                "Pointing into the screen.", 
                "Pointing down.",
                "Zero",
            ],
            why: "",
            image: "",
        },
        {
            question: "A wire is bent in a loop of radius R and has magnetic field, B. at the center of the loop due to current I. The wire is bent more sharply so that it now creates two loops instead of one. What happens to the magnetic field at the center of the new loop.",
            answers: [
                "It increases by a factor of 4", 
                "It increases by a factor of 2.", 
                "It remains the same", 
                "It decreases by a factor of 2",
                "It decreases by a factor of 4",
                "None of the options.",
            ],
            why: "",
            image: "",
        },
    ],
    11: [
        {
            question: "Which of the following is not a source of magnetostatic fields (B field which does not vary with time)?",
            answers: [
                "Accelerate charge", 
                "A DC current in a loop", 
                "A permanent magnet", 
                "A DC current in a wire", 
            ],
            why: "",
            image: "",
        },
        {
            question: "A current I runs along an arbitrarily shaped wire that connects two given points (A and B) as shown in the figure. The magnetic field at a point very far away from the wire will approximately be:",
            answers: [
                "Equal to the magnetic field for a straight line from A to B.", 
                "Larger than the magnetic field for a straight line from A to B.", 
                "Smaller than the magnetic field for a straight line from A to B.", 
                "We cannot tell as the answer will depend upon how the loops are created.", 
            ],
            why: "",
            image: "17.png",
        },
        {
            question: "Two long parallel wires are at a distance 2d apart. They carry steady equal currents flowing out of the plane of the paper, as shown. Which graph shows the variation of the magnetic field B along the line XX'? (B pointing up is considered positive while B pointing down is considered negative):",
            answers: [
                "18.1.png", 
                "18.2.png", 
                "18.3.png", 
                "18.4.png", 
            ],
            why: "",
            image: "",
        },
        {
            question: "A current I flows in a circular arc of wire whose radius is R, which subtends an angle 3π/2 radian at its center. The magnetic field B at the center is:",
            answers: [
                "$\\frac{3\\mu I}{8R}$", 
                "$\\frac{\\mu I}{R}$", 
                "$\\frac{3\\mu I}{2R}$", 
                "$\\frac{2\\mu I}{R}$", 
            ],
            why: "",
            image: "",
        },
    ],
    12: [
        {
            question: "We measure voltage using a voltmeter across two points on a circuit with time varying magnetic flux. Based on Faraday's Law, the readings on the voltmeter will not change as we move it.",
            answers: [
                "False", 
                "True", 
            ],
            why: "",
            image: "",
        },
        {
            question: "A straight wire carries a current I going into the page. The wire passes through the center of a toroidal coil. This current is quickly reduced to zero. The induced current through the resistor will be...",
            answers: [
                "From b to a", 
                "From a to b", 
                "There is no induced voltage", 
                "Impossible to tell the exact function of current with time given", 
            ],
            why: "",
            image: "",
        },
        {
            question: "Suppose of have two coils that you bring closer together, while maintaining their orientation to each other. Assume that initially the mutual inductance is non-zero. The magnitude of the mutual inductance will increase",
            answers: [
                "True", 
                "False", 
            ],
            why: "",
            image: "",
        },
        {
            question: "Below is a plot of the magnitude of the magnetic field versus time. The magnetic field lines passes through the plane of the loop (in such a way that flux is maximized). Assume that at each instant in time, the magnetic field is uniform throughout the plane of the loop. Rank the magnitude of the EMFs generated at each instant of time within the loop from largest to smallest.",
            answers: [
                "$\\varepsilon_{t=b} < \\varepsilon_{t=c} < \\varepsilon_{t=a}$", 
                "$\\varepsilon_{t=a} < \\varepsilon_{t=b} < \\varepsilon_{t=c}$", 
                "$\\varepsilon_{t=c} < \\varepsilon_{t=a} < \\varepsilon_{t=b}$", 
                "The EMF generated at each time will be the same."
            ],
            why: "",
            image: "12.png",
        },
        {
            question: "Both an induced emf and induced current in a circuit will depend on the resistance of the circuit.",
            answers: [
                "False", 
                "True", 
            ],
            why: "",
            image: "",
        },
        {
            question: "A conducting (non-perfect) wire encloses a solenoid. We measure the voltage difference between points a and b by placing a voltmeter and its wires along  the two paths as shown in the figure below. Choose the correct option.",
            answers: [
                "Voltage on path 1 will be $\\frac{d\\phi}{dt}$ in magnitude; voltage difference on path 2 will be ~0.", 
                "Voltage on path 2 will be $\\frac{d\\phi}{dt}$ in magnitude; voltage difference on path 1 will be ~0.", 
                "Voltage difference on path 1 will be opposite polarity to path 2; but the magnitude will be equal to $\\frac{d\\phi}{dt}$", 
                "Voltage difference on both paths will be the same polarity and same magnitude. We are measuring voltage across the same two points.", 
            ],
            why: "",
            image: "13.png",
        },
        {
            question: "Two identical solenoids each of length L, cross-sectional area A, and total number of loops N are connected end to end (in series) such that the loops are in the opposite direction. By what factor does the total inductance change?",
            answers: [
                "< 2", 
                "= 2", 
                "> 1/2", 
                "> 2", 
            ],
            why: "",
            image: "",
        },
        {
            question: "Suppose that you have a long solenoid with N turns. If you double the number of turns and the length of the solenoid, what happens to its self-inductance?",
            answers: [
                "The self-inductance doubles", 
                "The self-inductance quadruples", 
                "The self-inductance is unchanged", 
                "The self-inductance decreases by a factor of 2", 
                "The self-inductance decreases by a factor of 4"
            ],
            why: "",
            image: "",
        },
        {
            question: "A loop of wire travelling at speed v enters a region in which the magnetic field is going into the page, as shown in the image below. In which direction will current flow when the wire enters the magnetic field?",
            answers: [
                "Current will flow counterclockwise", 
                "Current will flow clockwise", 
                "There will be no induced current", 
            ],
            why: "",
            image: "14.png",
        },
        {
            question: "Suppose that you have a long, straight wire carrying current I, as shown in the diagram below. A rectangular conducting loop, located in the same plane as the wire, moves towards the long wire. The loop has two sides parallel to the wire and two sides perpendicular to the wire. The induced current in the wire is",
            answers: [
                "in the counterclockwise direction", 
                "in the clockwise direction", 
                "there is no induced current in the wire.", 
            ],
            why: "",
            image: "15.png",
        },
        {
            question: "Let's say you are calculating the mutual inductance between two solenoids, where one solenoid is smaller and nested within the larger one. One of the first steps is to apply Ampere's Law. For a more accurate calculation, which one would you apply Ampere's Law to, to determine the magnetic field?",
            answers: [
                "Larger solenoid", 
                "It doesn't matter which one since mutual inductances are the same.", 
                "Smaller solenoid", 
            ],
            why: "",
            image: "",
        },
        {
            question: "Wiggling a magnet back and forth in your hand will not generate an electric field at a fixed position.",
            answers: [
                "False", 
                "True", 
            ],
            why: "",
            image: "",
        },
        {
            question: "You push a  bar magnet toward a loop, with the north pole towards the loop like the figure below. As you push the magnet closer to the loop, the direction of induced current is shown in the loop. If you keep pushing the magnet straight through the loop, what will be the direction of the current as you pull it out the other side?",
            answers: [
                "Opposite direction to I.", 
                "Not enough information provided.", 
                "Same direction as I.", 
            ],
            why: "",
            image: "",
        },
        {
            question: "A metal bar is lying on a rail as shown in the figure below. There is no friction between the bar and the rails. At time t=0, it is given a push so that it starts moving with initial velocity, v. What happens to the bar afterwards? Select all that apply.",
            answers: [
                "The bar decelerates and eventually comes to a stop even though friction is 0.", 
                "The bar keeps on moving with the same velocity, v as friction is 0.", 
                "The bar accelerates and increases in velocity.", 
            ],
            why: "",
            image: "",
        },
        {
            question: "Suppose that you have a square loop of wire and you hold it in a uniform magnetic field. The plane of the loop is perpendicular to the field lines, such that the magnetic field lines pass through the loop. Suppose that you increase the size of the loop. This will not cause any current to flow in the loop.",
            answers: [
                "False", 
                "True", 
            ],
            why: "",
            image: "",
        },
        {
            question: "What is the direction of the induced current for the following case:",
            answers: [
                "There is no induced current.", 
                "Induced current will be opposite to the direction of w.", 
                "Induced current will depend upon the magnitude of w.", 
                "Induced current will be in same direction as w.", 
            ],
            why: "",
            image: "",
        },
        {
            question: "To change the EMF within a circuit, you can change the circuit's resistance.",
            answers: [
                "False", 
                "True", 
            ],
            why: "",
            image: "",
        },
        {
            question: "An accelerating charge will induce a non-conservative Electric field.",
            answers: [
                "True", 
                "False", 
            ],
            why: "",
            image: "",
        },
        {
            question: "Electric field created by time varying magnetic field is conservative.",
            answers: [
                "False", 
                "True", 
            ],
            why: "",
            image: "",
        },
        {
            question: "You double the number of turns in a long solenoid. How would the inductance of the solenoid change?",
            answers: [
                "Increases by a factor of 4", 
                "Increases by a factor of 2", 
                "Decreases by a factor of 4", 
                "Decreases by a factor of 2", 
                "Remains same"
            ],
            why: "",
            image: "",
        },
        {
            question: "A conducting bar is moving with velocity u in presence of a very long wire carrying DC current I as shown in the figure below. What can we say about the induced voltage across the two points A and B of the conducting bar?",
            answers: [
                "Point A is at a higher potential than point B.", 
                "Point B is at a higher potential than point A. ", 
                "There is no induced voltage as the loop is not closed", 
                "There is no induced voltage because the flux is not changing with time.", 
            ],
            why: "",
            image: "19.png",
        },
        {
            question: "Two solenoids with selfinductances L1 and L2; and mutual inductance M are connected in series as shown in the figure. The direction of current is opposite in the two solenoids. What is the equivalent inductance, L'' of the combination?",
            answers: [
                "L1+L2-2M", 
                "L1+L2+M", 
                "L1+L2-M", 
                "L1+L2", 
            ],
            why: "",
            image: "20.png",
        },
    ],
    13: {
        question: "",
        answers: [
            "", 
            "", 
            "", 
            "", 
            ""
        ],
        why: "",
        image: "",
    },
};

problems[7].sort(() => Math.random() - 0.5);
problems[8].sort(() => Math.random() - 0.5);
problems[9].sort(() => Math.random() - 0.5);
problems[10].sort(() => Math.random() - 0.5);
problems[11].sort(() => Math.random() - 0.5);
problems[12].sort(() => Math.random() - 0.5);
let positions = {7:0, 8:0, 9:0, 10:0, 11:0, 12:0};

console.log(problems)

const main = document.getElementById("main");
let loadQuestion = () => {
    let chapter = document.getElementById("chapter").value;

    if (positions[chapter] >= problems[chapter].length) {
        alert("You have completed all the questions in this chapter! Questions will now repeat.");
        positions[chapter] = 0;
    }
    let question = problems[chapter][[positions[chapter]]];
    positions[chapter]++;
    // let question = problems[chapter][0];

    let questionDiv = document.createElement("div");
    questionDiv.className = "question";
    let questionText = document.createElement("p");
    questionText.innerHTML = question.question;
    questionDiv.append(questionText);

    if (question.image && question.image != "") {
        let questionImage = document.createElement("img");
        questionImage.src = "images/" + question.image;
        questionDiv.append(questionImage);
    }

    let questionAnswers = document.createElement("div");
    questionAnswers.className = "answers";

    let whyDiv = document.createElement("div");
    whyDiv.className = "why";
    whyDiv.innerHTML = "Explanation: " + question.why;

    const correct = question.answers[0];
    const shuffled = Array.from(question.answers).sort(() => Math.random() - 0.5);
    let correctDiv;

    shuffled.forEach((answer) => {
        let answerDiv = document.createElement("p");
        if (answer === correct) correctDiv = answerDiv;

        if (answer.includes(".png")) {
            let answerImage = document.createElement("img");
            answerImage.src = "images/" + answer;
            answerDiv.append(answerImage);
        } else {
            answerDiv.innerHTML = answer;
        }
        answerDiv.className = "answer";

        answerDiv.onclick = () => {
            if (question.why != "") {
                questionDiv.append(whyDiv);
            }
            
            if (answer === correct) {
                answerDiv.className = "answer correct";
            } else {
                answerDiv.className = "answer wrong";
                correctDiv.className = "answer correct";
            }

            let nextButton = document.createElement("button");
            nextButton.innerHTML = "Next";
            nextButton.onclick = () => {
                loadQuestion();
            };
            questionDiv.append(nextButton);
            
            Array.from(questionAnswers.children).forEach((i) => i.onclick = () => {});
        };
        questionAnswers.append(answerDiv);
    });
    questionDiv.append(questionAnswers);

    main.append(questionDiv);
    renderMathInElement(questionDiv, {
        delimiters: [{ left: "$", right: "$", display: true }],
    });

    questionDiv.scrollIntoView({ behavior: "smooth" });
};
loadQuestion();

// my apologies for the spaghetti code. again, just a hacky fix

document.getElementById("chapter").onchange = () => {
    loadQuestion();
}