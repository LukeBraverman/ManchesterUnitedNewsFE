import './App.css';
import React, { useEffect, useState } from "react";
import {
    Box, Button, Card, CardActions, CardContent, CardMedia,
    Typography, Tabs, Tab, AppBar, Toolbar, IconButton
} from '@mui/material';
import { CircularProgress } from '@mui/material';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function App() {
    const [value, setValue] = useState(0);
    const [newsArticles, setNewsArticles] = useState(testData);
    const [loading, setLoading] = useState(true);
    const [loadingVideo, setLoadingVideo] = useState(true);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        console.log("EDIT V2: Running real API call");
        fetch('http://3.10.22.83:5021/api/news')
            .then((response) => {
                if (!response.ok) {
                    throw new Error("API fetch failed");
                }
                return response.json();
            })
            .then((data) => {
                setNewsArticles(data);
            })
            .catch((error) => {
                console.error('Error fetching news, using fallback:', error);
                setNewsArticles(testData);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Box
                sx={{
                    backgroundColor: '#8B0000', // deep luxury red
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 24px',
                    marginBottom: 2,
                    position: 'sticky',  // Makes the navbar sticky
                    top: 0,  // Keeps it at the top of the viewport
                    zIndex: 10, // Ensures it stays on top of other content when scrolling
                    height: '5vh' // You can keep this value if you want a smaller header
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <img src="https://www.logo.wine/a/logo/Manchester_United_F.C./Manchester_United_F.C.-Logo.wine.svg" alt="Logo" style={{ height: 60, width: 60 }} />
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        Man U, really want to read this news!
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', width: '100%', height: '80vh'}
            }
            > {/* Hide main scrollbar */}
                {/* Left Tab Panel */}
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs"
                    sx={{
                        width: 240,  // Adjust width for the left tab
                        borderRight: 1,
                        borderColor: 'divider',
                        position: 'sticky', // Keep the tabs sticky
                        top: 0,  // Keep the tabs at the top when scrolling
                        zIndex: 5, // Lower z-index compared to header to stay below header
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#8B0000',
                        },
                        '& .MuiTab-root': {
                            '&.Mui-selected': {
                                color: '#8B0000',  // When selected, the tab will show the deep red color
                            },
                        },
                        height: '40vh',
                    }}
                >
                    <Tab disableRipple label="News" {...a11yProps(0)} />
                    <Tab disableRipple label="Behind the scenes" {...a11yProps(1)} />
                </Tabs>

                {/* Right Content Panel */}
                <Box
                       sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'start', overflowY: 'auto' }}> {/* Only enable scroll here */}
                    <TabPanel value={value} index={0}>
                        <Box
                            sx={{

                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'start',
                                gap: 2,
                                width: '100%',  // Make sure the content takes the full width
                            }}
                        >
                            {loading ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                                    <CircularProgress sx={{ color: '#8B0000' }} />
                                </Box>
                            ) : (
                                newsArticles.map((article, index) => (
                                    <Card key={index} sx={{ maxWidth: 600, width: '100%' }}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={article.image}
                                            alt={article.title}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {article.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {article.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                                <Button sx={{ color: '#8B0000' }} size="small">See Article</Button>
                                            </a>
                                        </CardActions>
                                    </Card>
                                ))
                            )}
                        </Box>
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        <Box sx={{ padding: 2 }}>
                            <Typography variant="h6" align="center" gutterBottom>
                                Behind the Scenes Explanation
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    minHeight: '60vh',
                                    position: 'relative',
                                }}
                            >
                                {loadingVideo && (
                                    <CircularProgress
                                        sx={{
                                            position: 'absolute',
                                            color: '#8B0000',
                                        }}
                                    />
                                )}
                                <iframe
                                    width="640"
                                    height="360"
                                    src="https://www.loom.com/embed/aa13abbe49a243a48c2da1670c972538?sid=d3a176ea-d82d-4de4-8691-983e18bd4d81"
                                    frameBorder="0"
                                    allowFullScreen
                                    style={{ borderRadius: 8, visibility: loadingVideo ? 'hidden' : 'visible' }}
                                    onLoad={() => setLoadingVideo(false)}
                                ></iframe>
                            </Box>
                        </Box>
                    </TabPanel>
                </Box>
            </Box>
        </>
    );
}

export default App;

const testData = [
    {
        "title": "Irish kid lands souvenir of a lifetime after Manchester United’s Europa League semi-final win",
        "description": "EXCLUSIVE: Manchester United star Amad picked out Leixlip youngster Lee McDonagh after the 4-1 win against Athletic Bilbao",
        "url": "https://www.irishmirror.ie/sport/soccer/soccer-news/irish-kid-lands-souvenir-lifetime-35205367",
        "image": "https://i2-prod.irishmirror.ie/sport/soccer/article35205394.ece/ALTERNATES/s1200/0_AMAD4jpeg.jpg",
        "publishedAt": "2025-05-10T20:09:00Z",
        "sourceName": "Irish Mirror"
    },
    {
        "title": "Why Man United are changing their iconic home shirt vs West Ham",
        "description": "Manchester United take on West Ham in their penultimate home match of the season on Sunday but there will be a noticeable change to the Reds' appearance",
        "url": "https://www.manchestereveningnews.co.uk/sport/football/football-news/man-united-changing-iconic-home-31615116",
        "image": "https://i2-prod.manchestereveningnews.co.uk/article31615170.ece/ALTERNATES/s1200/0_Manchester-United-v-Athletic-Club-UEFA-Europa-League-202425-Semi-Final-Second-Leg.jpg",
        "publishedAt": "2025-05-10T20:00:00Z",
        "sourceName": "Manchester Evening News"
    },
    {
        "title": "Viktor Gyokeres to Man United transfer latest as summer move 'agreed'",
        "description": "Sporting Lisbon striker Viktor Gyokeres has been heavily linked with a Ruben Amorim reunion at Manchester United next season",
        "url": "https://www.manchestereveningnews.co.uk/sport/football/transfer-news/viktor-gyokeres-man-united-transfer-31615028",
        "image": "https://i2-prod.manchestereveningnews.co.uk/article31615079.ece/ALTERNATES/s1200/0_Sporting-Clube-de-Portugal-v-Manchester-City-UEFA-Champions-League-202425-League-Phase-MD4.jpg",
        "publishedAt": "2025-05-10T19:30:00Z",
        "sourceName": "Manchester Evening News"
    },
    {
        "title": "Andre Onana determined to stay at Man Utd and fight for career despite boss Ruben Amorim looking for replacement",
        "description": "ANDRE ONANA is ready to fight for his Manchester United career — and show Ruben Amorim he can be his long-term No 1.The error-prone keeper has mad",
        "url": "https://www.thesun.ie/sport/15187194/onana-future-transfer-man-utd-stay/",
        "image": "https://www.thesun.ie/wp-content/uploads/sites/3/2025/05/JW-OFF-PLATFORM-MAN-UTD-AMORIM-ONANA.jpg?strip=all&quality=100&w=1920&h=1080&crop=1",
        "publishedAt": "2025-05-10T18:54:15Z",
        "sourceName": "The Irish Sun"
    },
    {
        "title": "Man United's next signings once Matheus Cunha and Sandro Tonali transfers are completed",
        "description": "Latest Manchester United transfer news and opinion as Ruben Amorim gets his house in order ahead a huge summer transfer window",
        "url": "https://www.manchestereveningnews.co.uk/sport/football/transfer-news/man-uniteds-next-signings-once-31614635",
        "image": "https://i2-prod.manchestereveningnews.co.uk/incoming/article31614885.ece/ALTERNATES/s1200/0_Manchester-City-FC-v-Wolverhampton-Wanderers-FC-Premier-League.jpg",
        "publishedAt": "2025-05-10T18:30:00Z",
        "sourceName": "Manchester Evening News"
    },
    {
        "title": "Erik ten Hag's next job stance 'confirmed' as Man United dig revealed",
        "description": "Former Manchester United manager Erik ten Hag is on the lookout for his next job this summer after leaving Old Trafford in October",
        "url": "https://www.manchestereveningnews.co.uk/sport/football/football-news/erik-ten-hags-next-job-31614733",
        "image": "https://i2-prod.manchestereveningnews.co.uk/article31614828.ece/ALTERNATES/s1200/0_Manchester-United-Training-Session-And-Press-Conference-UEFA-Europa-League-202425-League-Phase-MD.jpg",
        "publishedAt": "2025-05-10T18:00:00Z",
        "sourceName": "Manchester Evening News"
    },
    {
        "title": "Man United transfer latest as £85m Sandro Tonali move tipped and Mason Greenwood reunion lined up",
        "description": "Latest Manchester United transfer news and rumours including an update on Sandro Tonali and Mason Greenwood",
        "url": "https://www.manchestereveningnews.co.uk/sport/football/football-news/man-united-transfer-latest-85m-31614470",
        "image": "https://i2-prod.manchestereveningnews.co.uk/article31614563.ece/ALTERNATES/s1200/0_Lille-OSC-v-Olympique-de-Marseille-Ligue-1-McDonalds.jpg",
        "publishedAt": "2025-05-10T17:30:00Z",
        "sourceName": "Manchester Evening News"
    },
    {
        "title": "Manchester United receive unexpected injury boost ahead of Tottenham Europa League final",
        "description": "Manchester United face Tottenham Hotspur in the final of the Europa League on Wednesday, May 21 at Bilbao's San Mames Stadium",
        "url": "https://www.manchestereveningnews.co.uk/sport/football/football-news/manchester-united-receive-unexpected-injury-31614567",
        "image": "https://i2-prod.manchestereveningnews.co.uk/article31614637.ece/ALTERNATES/s1200/0_Manchester-United-v-Athletic-Club-UEFA-Europa-League-202425-Semi-Final-Second-Leg.jpg",
        "publishedAt": "2025-05-10T16:47:29Z",
        "sourceName": "Manchester Evening News"
    },
    {
        "title": "Marcus Rashford to Barcelona transfer 'latest' as Manchester United await decision",
        "description": "Manchester United winger Marcus Rashford has been earmarked as a player available for sale in the summer transfer window",
        "url": "https://www.manchestereveningnews.co.uk/sport/football/transfer-news/marcus-rashford-barcelona-transfer-latest-31614332",
        "image": "https://i2-prod.manchestereveningnews.co.uk/article31614449.ece/ALTERNATES/s1200/0_Manchester-City-FC-v-Aston-Villa-FC-Premier-League.jpg",
        "publishedAt": "2025-05-10T16:30:00Z",
        "sourceName": "Manchester Evening News"
    },
    {
        "title": "Antony supported by six Man United teammates after latest move as transfer talks confirmed",
        "description": "Latest Manchester United news and rumours as Antony continues to shine while on loan in La Liga with Real Betis",
        "url": "https://www.manchestereveningnews.co.uk/sport/football/football-news/antony-supported-six-man-united-31614471",
        "image": "https://i2-prod.manchestereveningnews.co.uk/article31614345.ece/ALTERNATES/s1200/0_GettyImages-2213551592.jpg",
        "publishedAt": "2025-05-10T16:14:39Z",
        "sourceName": "Manchester Evening News"
    }
]
