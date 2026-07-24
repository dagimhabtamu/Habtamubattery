import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { User }       from '../models/User.js';
import { NewBattery } from '../models/NewBattery.js';
import { OldBattery } from '../models/OldBattery.js';
import { Accessory }  from '../models/Accessory.js';
import { AcidStock }  from '../models/AcidStock.js';
import { Sale }       from '../models/Sale.js';
import { Cost }       from '../models/Cost.js';

dotenv.config();

const DEFAULT_PASSWORDS = {
  'admin@habtamu.com': 'admin123',
  'staff@habtamu.com': 'staff123',
};

const run = async () => {
  await connectDB();
  console.log('Clearing collections...');
  await Promise.all([
    User.deleteMany({}),
    NewBattery.deleteMany({}),
    OldBattery.deleteMany({}),
    Accessory.deleteMany({}),
    AcidStock.deleteMany({}),
    Sale.deleteMany({}),
    Cost.deleteMany({}),
  ]);

  // Users
  const usersData = [
  {
    "name": "Habtamu Admin",
    "email": "admin@habtamu.com",
    "role": "admin",
    "_plainPassword": "admin123"
  },
  {
    "name": "Staff User",
    "email": "staff@habtamu.com",
    "role": "staff",
    "_plainPassword": "staff123"
  }
];
  for (const u of usersData) {
    const plain = u._plainPassword || DEFAULT_PASSWORDS[u.email] || 'changeme';
    const { _plainPassword, ...userData } = u;
    await User.create({
      ...userData,
      passwordHash: await User.hashPassword(plain),
    });
  }
  console.log('  User: ' + usersData.length + ' items');

  // New Batteries
  if (3 > 0) {
    await NewBattery.insertMany([
  {
    "brand": "Delicor",
    "amperage": 100,
    "model": "Japan",
    "price": 19000,
    "stockQuantity": 1,
    "warrantyMonths": 12,
    "description": "Excellent Battery ",
    "imageUrl": "https://th.bing.com/th/id/OIP.UKJMEGx_sLlQRzm2EPxpBAHaFz?w=208&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
    "published": true
  },
  {
    "brand": "Gs",
    "amperage": 90,
    "model": "koria",
    "price": 15000,
    "stockQuantity": 1,
    "warrantyMonths": 6,
    "description": "Very Good Battery",
    "imageUrl": "data:image/webp;base64,UklGRuQXAABXRUJQVlA4INgXAABQeQCdASoqASoBPp1KoEulpCMnpTMKYPATiWVu+F9KXN/F/QhHfF3St/r77WjE0Se5r6fy33v/+j60+ah6rOe386rfet6ltQfznsd9B9C2/P831wk9XZTg94IPWuGz0yZsWQBwU9Abyj/97zJvw/RdJ318dIVm1as2rVm1as2rVm1as2rVm1as2rVm1as2rVm1as2rVm1as2rTVW5JqUjbXtkTXRL/aWY3Cq6x7gH7KNAZcny7MWEDEjXY6mCV5jdRHMh18DcW5DPa/GZQabGomplicjmGYrmFPUBosNR46kNbuApKtgRmLbBimGtuCGiDldKgbxkMwgqXTd9rSOSCJdqRi6meWObP2dd3o47igyD6Gr4zO2yq1I1ztAvtOU1Xb+bpi6Be9aJ99qT65BcZBiJWcBECeNK/uz55+qbmjVbWwXpee2leE4ErL4P8zqtA0fdoai02/mf1E3WAs08JSwBuUcVP4GbMWp4eIKWvzmTzA10xZd/7dt1V+Oxrws+EFD5ASUsaxYZfe9STD7jtg521/92pBTQJc7UgxiYsXh/bCcys5iR+s+X8gHYmJx7X9uz0uCDu0LGM7BXPEiUL79LG/S8h3UYzk4GIVzMeexH9Rs8sm78lj1X2YXDZuRFlV2YtWkF0XPJRl/tY+p5625TbAk4eN0cvzvw7dWo7fCaGgNVQjQkmUIAOkECD88bZh8Vh6hJQ4Yve2LD7dtLLAFFShIDbFCVA7LqFHraV1zIE7ydj3Lq9qGQrI+Vw4toQRLxmw6dGxf5p8vYTbG+r/6vvIP/P7bRIiyuykvJWP2fo11qFlA6fcY4fWZmFc2GKqMnzWXiM/+6Eje3m8rGR4X3WX1DXtfOGPxqiUcxKLjbUfNj5YoNHZ99osNePfwsva4L8e2dy92LqQUvnX4xkcr6TsUujr2i4Gj/U8TCAnKbqF/39Q5y1XNwJgthH3NAh1w14SE96GsptjxfnhTe/a3jcj3vMNrThgclcs/BXFOX5KCgl7qUq+HRP3/CKhJ9WsthR4aD02uSKsLpqBBx05TI33zS7PfaK2sJE9p1x5c2njEmecoQxk2GCWIdhA5xGu7bXX87TkeFCr0ZmhgtOpwYo0gCnaEzuiV7SpNgbba8o/n5zRNgnjOeTZgI3FeXgZsanddZJxmN3ubAmbPFHSullSRcfn3lI0JqYHPPbBAetIpfB31fccIaLqxBTeL4njC29ZP8iqw9ZJ8cJM9QyjzMFK69YHjzRgl4zajLeRg4bjOcw5+w03F/YxcS4znKYHSFZtWrNq1ZtWrNq1ZtWrNmwAP7+nDAAAAAAAAAAAAAAY/uubSbd9Q9lwdVOIXvbLDKrzooHZwYGje6KH/P/BgCH5SReAAVqpEbqfd+p0sKTIgxLTK46Wq4hcHXMX+4Hu+412g8hfqa35sRZEvt88ijQVdXu1qLJJtu7HtCZC2YxKb06w9huoR6jH4kmVF1Zb2r0TjzeuuvJ8Zkh4MVdvAgNLwWy2pJlYI3en8aCL5Kn93J4yfhvyyvqj5NuV8AmULtxW7tl/yk9fpbcI7PD9lEUatzzBZT/9D1g1lafM+NkaGAMrswcb7A70qtnEn2FGF1tX+gYJISStgDxN101MXuPkrG8O/W/dxvNYeVXok8MdhKiODTXGyKHg2fTyU9PtXsL7cTfoCyAvEp+0+lzUXnDHdEYp5lkMzps+/rVRX7E+dQaZsUkwAddxOWonFn2dq2XdrYAnVu2iaERuka9IKTuKBX8a04+UNINo36V14sxMAgmAfPxNrwOd3xbiyJcrkxXi6hNdvODsg+I4RZHBJ3YLVl7YJVVIK1H0hCHrl4CToK9WOIID+WoXgXrXcKWSuCfTr/Y54z+3VKCT2s2osRnqKSI8DRHm/WdfS7P9fy6PAlRM5B/hTE0t5tDLW4r+Zt+DJGMtToyesG/BDHc5hCnofVVtDneZun7RNHQ1UKLNrOcoZSMHU0/d9q76wZGK1xmajuX/WcDlQ7wTQxm5ngqwOT8zT5YVtfmqk6GPWQqjZlXd1xWH27eQQExiJeJuZYc3gTqOqCw28VC1JXc4oYXIdMLXPkgAzrp7Q4eAzQIEbF3HJHpneW3LZRzFdvHmtHd5QZvZsPlyvmGD2Kj5mYvssr8wkPbUFCz7py546GDZsExvpZiOIYkczbvQiT4dZ7Es4O7uzprCW1rNJRB9j+faKsw8hpf6+CJZ9itTFPPlbykiqr+Rq+02WNrQUhOqyOfTwGVAq8SnUDRgb4DmdNgaK+4SU/W/q1VgmilgXNZL4NCHHNeh44CTk8vL4vvp2LxgfyW0PM5vscatLDeZnlnYVgYZdIhSGNOHGw4rVqWgkxhSwTpUIw3tIZ9CFP4dm4EujKfYlFtjQA3znau7B9svKkdfynp3Vn8PEvqknY+jQXVWIPUBVz6yYGkjguf/tw29dQSepUYMWU2sxVU848XeZ3PZ9a6Zno7Pu7x23x5jEq5gQRnjyZv/Tn52xL0UVsDneIPFKiRoz0WRZqV7YkWxXH2jTZu+j2DDor4yziHXFxjdbz/Tv8onrfxbST0TkQUnc3iVV9vdehCjOzxJV3hdb6peMLbv7IK+dyrE/1pcyiCkTm6YAYL/Xiry45rog6rlXOegqD6C5ZUhXbF0zLgCkv9zMQqMzY9eZg1DpkhU5/PY7/YAFBTh85xvz1NZaxJlqO5xCrnuOcrO2HxZdKwyDFcQQogATyoAGUB90zM7OhuoBtxTRy4eIUPTWgC4XvBGYvK9PkqrKQfTxUyc7APSIW88ekzD9KdV6tWH7nqZEgs+UI4aosdsKMx/WhHjxM8MZlX5Dg3fRkGDRqYsMZUhfQG9DCteW2CpfeZ8NXJXkIBaH4goYHG1ZVQ2L+mhVa1JVZ1MZ1XH2gF+/3wPTti37VZz6v7zE+7Q/bvf5cJ/NFK6kaG6L+HyJZLF9evT3xsfHdJyGMtnYpJliH4bh7OUE0wvPTLDYbL4JZhT/jwq0ahcCHYlqGqGCzGQLQMxIdQ6LKbJ1MJmV5H4L8K3GtxTLUlREZobWMX/Ebbf2sNNRDyfdHqP0EXNmdMrg0nto0k76LbFF2H5u/Wzt6LRA0J08zCsvqgvj80IMFtNWqrlIxe6tkv5opNIvstJwhWHlu6l0k/wiuHACPa7iMUopUqXcxDGEwvElGWrRbLwtmN9UHY3ViJWY918rMGVETd6jDUHbxi3d+GY4M2TpMnB86Hq9Vv6sZH2tiUWspd7NtXl4fKxGbtgM0JBu62xM0Xd6p+v96hregDUpOUKSWc6/HQ6pAmlHWcihJ9uxa3vDHl9qICaxiqwX6ICEfLxXETAcGa0ch53LHxur/G4iKdMwtqpBVIZ8L5XWzcZwJq+u2toEwz98VEqOC2DrstmLZa+FWHF/Ph1ZIwWJV5di9PKRTuYCxrSJlzGAWJ6C9ZW9zRydajd+8YpuWHfMaGPvP5UEPo6S+Da63M7tjlurW18/c5HKgZ9rShyVsIpcc8Al+uGNfuBC7XdroEoTF0ZxBTJVwrdU/h71G03PKVGrH7P6Isvdb2+yoQ0IR5KyPI1rkBAzF9RgJMnB4q6AKtGZfQxUF5wxYpW9tQA8tJxQQtOh2g45934x242Mm2tSt/DF7qFlVKAblwxSVgW1ElfUIHRasgedM8CC2Xxu+ifgqOs9tvoKQw4dJONiJZwHml6B+XTqUues0zAZVPF5n6A6XibNH+9hZFaV4W4VoVoE9UFHc7Wek+3LWR56UrIz6QFvgiiWVfJ+jqAs7ZXfrKHHFivRZn9HFr1hie/DEsPB2jAD3yBWWXdPIr6Duhja19+gT6ufEksBOJ53vnZRT/aIEOyb1cjyII7i2auptliw4rMjNMDDZYFYvQqYalrnw6PS2+nMZFfVhqjnVUcAyhRcbor3hHOx929erI2Zr+JZCo4HtGQiOlvht/yot9eHIIyylf8t22uf2i0QchF06/k3vpIVW+DsDyGGFBVZKmErI7TL/CWBRbyNyn0iqJ0tswkMN6JAWWJesZ/mfpReY/A8IDncfucvw4ci1BJ8/BhEVi6pHr4jGsux5gXYtVC8Y8H9NuW/5ea2ZOQjkdPtqoTMcuSzRf6S7+19EdozfEJYZDtwfhdt0evZG9Nqg/jy5oQ9QkNx91ZFwqxrm63JoyMJw0GCYM1wHij/WM7VJT1zMRrvKvwC75D+BWRsP3XnGfNdW3CiDx4RC3t5d9qMyHJuzoK/5aZc37TZFOhC6zcsj7GNf6tUdL1xrA2BMOpIfQ76Ns3vljgsYoZr1k42O0YmV16YlTcyBuGiNuJzv0jEZ4iokeSCdq0jaiReRyDBDdMLt4KXPwlrqX/pu/KbtsNgQMvjmAKf6vj3n7mMH+zGeUN8TZ2eCajDmdybyCtCrKCEOGhVBxyb3QoLVl/G8msJ19f+s8WFBnFHNcHSMuAfelsDoCv80/FjJGAFhI6TpyGf5kurF3O7ubH43KUquPhMdAEoZ4sza3lRJCUCjrQbapXxPGWPN5Az3M8P39b1oU3vdHKJkrnpdHIBV8cBgHN2Atrryjcc1hYpUTg951kAY5OAlxnM/SEV6Eipqj8CY6LU0KXO4xMW6k7kXj3aVmLWeiWOv/0dwq4kE+wRrg5G3vMTa5knG+YjffYPRk7Ag/B+hpZvSJU1xieA4dfKKqM/1yDHWLkkytIhnF1RnKaIsyMt9BYqYXeACa9AF/OrqVccBY3Rdt9UiOn3rVeX/qLbCmCpf0nV2GIolEebe01I7unpBsmbVzbPKGtivPsNs5yu/+CUOaQAWxFrfPTKVf2dnAZ3KVaGjeKmBfmmmG3ElmcAWmMHv4v7JCMmUB4zE6niNiM/bWBvBVzuEupL3Lqqb3F3Dd2to0PSXKokRjLLgmTZ6FJnOCu+we66s6PtlfwJIcB3rjO6H1QWJGRXVO1xmmJujk5ZNeWD6CiXw02osdN+0Oj7FDPHbrliXOrESmJhF7p7q24MmmN47H0aBtlIzO5i2xr39lPJojx5WrER/bXlACrlolC8/ar4Ge1xwDWaCDyW4a8C/fLKzFyPvzn6ZcgaM/ozq7eKzSQsHtB2NbLlZ5mh7tTmnKjl5EfuqjWy48uG2Ep8nE7Vz6m9fP0KwN8OatUmo4wjam4dgFNS0QHU3NNy6G7E/MHe3vZN/9qCMXZaDWrIhOFG9dZe2sNHeDT8RmgyLU4Z0/0YTqQU3jgspd1EsY1+yQgpAxkKI+83KkGgEJsJq2gho3Hm7hPZOcDU9VdSCkroUVFVxSizagdbImae8AKPutM06Nrxb88dmIWhMQoWH8GmxnuFTSmrQiOd2EgsxDVLAshUTIG9CpsJdr1ClC/ryEWWgyrosYG4pe1kflpFBhl3HX4jrH05ZCJqCrXEL5y3FKJLTcgzfeeaHFhUdfd1cY6MGyGhiEu6P8+OiADiyXxehsMHeUPaY7Tvyk2UuiFIiNz2aq1K5/BQHw1nd6NkukvWC5cBlpjrAMtvHSKuRCp4pjS9vcuoF3F6x081wf4b0aKgnLSbVyTcc1bFxS+hI4Kcsw3M4JXOe553e/guhJF/GO1oa/DeFAP2XXlWFgvDnvMqJ9YdRrzvG8MMp0GmKIfuWkfAsxmbMkF6YVXOVexBv0JLcytg9nBTmzmwRNBNIifV1FkQxY1liCeMAHIeTKKPe45beLg+yD6l1dRBt5wVw/Gcld2OlmXTchjF/kdr+yG6fv2AkWzPcwU5Us1rvT9Z8zVoiBjU2xoZ/yP3iIGCfnY9jlTKQHbObIxpptZGnLFLRawpoGXLpY7AzBHrPQQoFX9eCCf57Tj2FKkOPip+ebE2Lm21w12r/Teuqod4EiRzfoDxaNsXi6CFsRsA1Z5Y3BTPNjOvqNKdjm+/p8/preJh2ykuq9Ij+i6mgKaXvPLYjWHtveqPljhLa5nPSftAsYXAtVUiahQd9wb3wy/29/p2fsqmskgQ2bK8p3zQUjdR1b95YPdJQ8KiiRNiKzlFs/pzDAOWyj2GRSNXoRWljl0/PELF3Hy8xhbNDVjSWV/Ey3AVAHZHgt+JbZaOWWeF+a2djjCIfVhAjvRM/hnUUJgFq6RiBS+yIQutcmeO+nvKwkHnTsvfieMzpJU8H34dHeinNANA2gX0BNl0+2b6dM/kJTFAcaNbnbwDoVHIT6Ce4SUFoeIYRN1HPz6pXiy+szS1nj+V4JPmWQ2gc3C/y2ANseAIoAloYZC++T3G3BJcK37+ZV9IiAWdUODdc3Yw0ITje/d48zs7ztK7kjcomeN4AC2UISrUZl75plOG+NsWP7wJzGq+EmpOjDohCWsw2+SsVbrag5VXTvXuBD2Q4QDqc05DhX0lILEch1K2O+4N/J+VHHRboFOWLNO82aAc4VcCzh1dD9w2b+7M4+2Snx0lLC57lAHCEEaeEn/DTL2c3UiiitxkvYs0tyCg7nfnmhgsS3yVbhd2VzO1G+NK1XU3IEyvWeCDC/VxJ6qTWMJjyXVLdiyn6ZT9cUNevMdW5H197paJLL100naojVWsNJ95GhbpbxWYHrLJPHsUP/vOpCWoxWG87LmvqlnMls7US/UDIjvzOYj7losLytjV2luuvY67GeY8ZWyhzUcDZDqUJZbiqVr6n1TAjvaxZ9vgnEZ8Fbp2IKTwHKHVmnpeY72Q/5cIBYMoMLPSnvvjCvOWxW7lT1evDVNRQFD5Y4f6N5scXYj9SdkKukf0z5S8lcmDYCZepZAUTSakJwKPrVGFBbct+Oih+ZXAoO21v28gMgACZ86wsQ1vNo5enotRk/0GDNqwqOEf05IOZsjTFQaUozC6uM7/vditaFAFlMYOdMSBb3fMEDndRDqRTd40pdloHfESvgAlLpGr0pFqhmTRm267S1KPw63wmAW+jB/Nzv/Q9dQ07QL3bJE1L+mNWbaVdCSbjKErNGWgViNUxSS9cAHtP4A+iO2OK/D4PAF6tI7Lqb8g7PDm4yMJ/PwSG05voOX/7EIgDJBa7F8XzZuzEiLuh1Bi8yxe7apfKKDJVQDizEbnaNqyf4bMKrgXQ+0TfoMblwdqt9qomnLuOIF04RP1GT0q3Y/F8iYRgUuAvXvZQyQiJssrmniTkDg39Yu7RGg1fHqYG8oXuNdS4NebUIiTXTkfYhQTzPY6HvBrLfWPF2PsIPWZbEuxWpOr5wfGyYpaBTOGymjrtIcLgiR8kP7xoJtmeC8fW76mOgF1YV08etgPNmzlZv46FAnZG8Hr/AXrH8GlnkAUAmtxJQIOLU5wZOz90Uuab9i5HII+h/LalafSwgRgQMWZiFD+FkfVZ54QuILGz4hMefb4gnFxtuGRE38XtgVcwPrgYWvSQr8bIcACrY7IkchTJlt4U46o29iMZEzbX04UqZ0K+ZK2k+nCKPfGOXPu0OfkVGi/uLf0sQrU0OWnHzZUmycFgVNQN+FgQ18EGineWstc2uZdqIftj20DUAffYKZKetZW+gnmHxdN6BbGGN41MZLNM6H/g7zsM4QGTqT7DGRQpldoAumjGy2J7goUezUtbdfFQCHy2NObbIvY+hhyb0bTadlYVCYapiGxiyO6I1PmRGdrZ1RZPWRD1iQrXZQeX3zPmvfAk2cRwrQJAwYkA3PketzEywTVURn7t0vyit8A8oROBJAIo/mljrsMOfqscGAv+G3VjNkngXzuOTC9TOawjRFcrLZwihAznC77jCpRi2ST6wNm0DLD4oe12ruj5ZHNfGtQgTARV4M+9Ig33u+2E9AUmWRfU27k6O6nqEDiCnNu/DgSSR8tvi4pYmIlMA2an6+b1sAQ7ltaI1FV4Otfa9wNM2AcJsALSb5HxDlQTiDa7f0U0zc8o5U6HRH7TVlcqfpEeRHf4X+2/ys+pgeXffKXEOyTKpTcMaUkupoy1c5qmIbmdSQxwSInsMilG156tuarg+7yJuu0hVuE2Uay2++6xtfv6lGr9KejVv6FqQCU6Mhs+gBLqaKthpQD0kq/Sl5t16Oqr97F/opvl3kUEJaOpyjmBVYUlTBgWer+PSqXD+bSt5yd9M+/oUlW8wLBPQK9eOMGAKAd1JabqBHNxwxVbNHMCK6AumxcRIyqFrqS7N0wc1DxEt70Brj41kOjlETX4RjxLAAAAEeYwHsh4lEOAAAAAAAAAAAAAAAA==",
    "published": true
  },
  {
    "brand": "Energizer",
    "amperage": 45,
    "model": "Italy",
    "price": 11000,
    "stockQuantity": 1,
    "warrantyMonths": 9,
    "description": "Top Battery",
    "imageUrl": "https://th.bing.com/th/id/OIP.OZHHEsPRl2PBP6WOJCaKNAHaHa?w=164&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
    "published": true
  }
]);
    console.log('  NewBattery: ' + 3 + ' items');
  }

  // Old Batteries
  if (3 > 0) {
    await OldBattery.insertMany([
  {
    "brand": "CV",
    "amperage": 60,
    "weightKg": 19,
    "purchasePrice": 1200,
    "pricePerKg": 40,
    "condition": "working",
    "status": "in-stock",
    "acquiredFrom": ""
  },
  {
    "brand": "GS",
    "amperage": 60,
    "weightKg": 0,
    "purchasePrice": 1500,
    "pricePerKg": 0,
    "condition": "working",
    "status": "in-stock",
    "acquiredFrom": "DAGIM"
  },
  {
    "brand": "js",
    "amperage": 60,
    "weightKg": 0,
    "purchasePrice": 1100,
    "pricePerKg": 0,
    "condition": "working",
    "status": "in-stock",
    "acquiredFrom": "ha"
  }
]);
    console.log('  OldBattery: ' + 3 + ' items');
  }

  // Accessories
  if (1 > 0) {
    await Accessory.insertMany([
  {
    "name": "cabo",
    "type": "wire",
    "polarity": "n/a",
    "price": 1200,
    "stockQuantity": 15,
    "unit": "meter",
    "imageUrl": ""
  }
]);
    console.log('  Accessory: ' + 1 + ' items');
  }

  // Acid Stock
  if (1 > 0) {
    await AcidStock.insertMany([
  {
    "quantityLiters": 250,
    "pricePerLiter": 200,
    "costPerLiter": 0
  }
]);
    console.log('  AcidStock: ' + 1 + ' items');
  }

  // Sales
  if (8 > 0) {
    await Sale.insertMany([
  {
    "saleType": "newBattery",
    "items": [
      {
        "refId": "6a3d8954734d995cb195cfaa",
        "refModel": "NewBattery",
        "name": "spartans 60Ah",
        "quantity": 1,
        "unitPrice": 14000,
        "subtotal": 14000
      }
    ],
    "totalAmount": 14000,
    "customerName": "wesange",
    "paymentMethod": "cash"
  },
  {
    "saleType": "newBattery",
    "items": [
      {
        "refId": "6a57643e36484f56bfe834f3",
        "refModel": "NewBattery",
        "name": "GS 120Ah",
        "quantity": 1,
        "unitPrice": 15000,
        "subtotal": 15000
      }
    ],
    "totalAmount": 15000,
    "customerName": "ABITI",
    "paymentMethod": "cash"
  },
  {
    "saleType": "tradeIn",
    "items": [
      {
        "refId": "6a3e67ab23408a431a3ca159",
        "refModel": "NewBattery",
        "name": "jz 60Ah",
        "quantity": 1,
        "unitPrice": 11500,
        "subtotal": 11500
      }
    ],
    "tradeIn": {
      "oldBatteryBrand": "GS",
      "oldBatteryAmp": 60,
      "oldBatteryValue": 1500,
      "priceDifference": 11500
    },
    "totalAmount": 11500,
    "customerName": "DAGIM",
    "paymentMethod": "cash"
  },
  {
    "saleType": "newBattery",
    "items": [
      {
        "refId": "6a57643e36484f56bfe834f3",
        "refModel": "NewBattery",
        "name": "GS 120Ah",
        "quantity": 1,
        "unitPrice": 15000,
        "subtotal": 15000
      }
    ],
    "totalAmount": 15000,
    "customerName": "abebe",
    "paymentMethod": "gimashun be birr gimashun be tele birr"
  },
  {
    "saleType": "newBattery",
    "items": [
      {
        "refId": "6a60ef851231f64b53490975",
        "refModel": "NewBattery",
        "name": "habtamu  60Ah",
        "quantity": 1,
        "unitPrice": 12000,
        "subtotal": 12000
      }
    ],
    "totalAmount": 12000,
    "customerName": "tesfaye",
    "paymentMethod": "cash"
  },
  {
    "saleType": "newBattery",
    "items": [
      {
        "refId": "6a60f1f91231f64b53490b20",
        "refModel": "NewBattery",
        "name": "gs 90Ah",
        "quantity": 1,
        "unitPrice": 15000,
        "subtotal": 15000
      }
    ],
    "totalAmount": 15000,
    "customerName": "0911081006",
    "paymentMethod": "cash"
  },
  {
    "saleType": "newBattery",
    "items": [
      {
        "refId": "6a60f4201231f64b53490ba4",
        "refModel": "NewBattery",
        "name": "jz 90Ah",
        "quantity": 7,
        "unitPrice": 13000,
        "subtotal": 91000
      }
    ],
    "totalAmount": 91000,
    "customerName": "",
    "paymentMethod": "cash"
  },
  {
    "saleType": "tradeIn",
    "items": [
      {
        "refId": "6a60f1f91231f64b53490b20",
        "refModel": "NewBattery",
        "name": "gs 90Ah",
        "quantity": 1,
        "unitPrice": 13900,
        "subtotal": 13900
      }
    ],
    "tradeIn": {
      "oldBatteryBrand": "js",
      "oldBatteryAmp": 60,
      "oldBatteryValue": 1100,
      "priceDifference": 13900
    },
    "totalAmount": 13900,
    "customerName": "ha",
    "paymentMethod": "cash"
  }
]);
    console.log('  Sale: ' + 8 + ' items');
  }

  // Costs
  if (0 > 0) {
    await Cost.insertMany([]);
    console.log('  Cost: ' + 0 + ' items');
  }

  console.log('');
  console.log('Seed complete!');
  console.log('Admin login: admin@habtamu.com / admin123');
  console.log('Staff login: staff@habtamu.com / staff123');
  process.exit(0);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
