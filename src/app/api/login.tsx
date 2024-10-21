
export const RegisterLogin = async () => {
    const formData = {
      tele_id: String(userData?.id),
      name: String(userData?.username),
      email: "",
      region: "",
    };

    try {
      const response = await axios.post(
        "https://api2.fingo.co.id/api/user",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setUserDetails(response.data.data);
      setCookie(null, "token", response.data.data.token, {
        maxAge: 3 * 60 * 60,
        path: "/",
      });

      if (response.data.status == true) {
        console.log(response.data.data.daily_status)
        if (response.data.data.daily_status == false) {
          setModalOpen((prevState) => ({
            ...prevState,
            modalDaily: true,
          }));
        } else if (response.data.data.daily_status == true) {
          setModalOpen((prevState) => ({
            ...prevState,
            modalPermission: true,
          }));
        }

        setDailyCount(response.data.data.daily_count);
        setCount(response.data.data.coin);
        setIsLogin(true);
      }
      triggerLoading();
      
    } catch (error) {
      console.error("Error Login:", error);
    }
  };
