// src/features/scoreboard/ui/Detail.jsx
import { useState } from "react";
import { Icon } from "@iconify/react";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import InputCustom from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Pagination from "../../../components/common/Pagination";
import { useScoreboardDetail } from "../hooks/useScoreboardDetail";
import { useNavigate, useParams } from "react-router-dom";
import "./../../../assets/css/custom.css";

const Detail = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const {
		data,
		loading,
		page,
		length,
		totalRecords,
		rowsPerPageOptions,
		filters,
		handleRowsPerPageChange,
		handleNextPage,
		handlePreviousPage,
		handleTempFilterChange,
		handleFilterSubmit,
	} = useScoreboardDetail(id);

	const breadcrumbItems = [
		{ label: <i className='bi bi-house'></i>, to: "/", active: false },
		{ label: "Scoreboard", to: `/scoreboards/`, active: false },
		{ label: "Detail", to: `/scoreboards/${id}/detail`, active: true },
	];

	const handleDetail = (branchId, userId, positionId) => {
		navigate(`/scoreboards/${branchId}/user/${userId}/position/${positionId}`);
	};

	if (loading) return <p>Loading...</p>;

	return (
		<div>
			<title>Scoreboard Detail</title>
			<Breadcrumbs
				title='Scoreboard Detail'
				items={breadcrumbItems}
			/>

			{/* FILTER */}
			<div className='w-full border-separate border-spacing-y-3 mb-3'>
				<div className='row'>
					<div className='col'>
						<InputCustom
							label='Start Date'
							type='date'
							name='start_date'
							value={filters.start_date}
							onChange={handleTempFilterChange}
							marginBot='mb-0'
							marginTop='mt-0'
                            background="bg-start_date"
						/>
					</div>
					<div className='col'>
						<InputCustom
							label='End Date'
							type='date'
							name='end_date'
							value={filters.end_date}
							onChange={handleTempFilterChange}
							marginBot='mb-0'
							marginTop='mt-0'
                            background="bg-end_date"
						/>
					</div>
					<div className='col d-flex justify-content-end gap-1'>
						<Button
							type='button'
							label='Cari'
							color='#00ACC1'
							marginBot='mb-0'
							marginTop='mt-0'
							onClick={handleFilterSubmit}
						/>
					</div>
				</div>
			</div>

			{/* TABLE */}
			<table style={{ padding: "10px", backgroundColor: "#e0f7fa", borderRadius: "10px" }} className='w-full border-separate [border-spacing-y:8px] text-sm mt-5'>
				<thead className='sticky top-0 z-10'>
					<tr className='text-left text-gray-600 shadow bg-[#26C6DA] text-white transition'>
						<th className='p-3 text-center font-bold bg-[#26C6DA] rounded-l-lg'>No</th>
						<th className='p-3 text-center font-bold bg-[#26C6DA]'>Posisi</th>
						<th className='p-3 text-center font-bold bg-[#26C6DA]'>Nama</th>
						<th className='p-3 text-center font-bold bg-[#26C6DA]'>Jobdesc</th>
						<th className='p-3 text-center font-bold bg-[#26C6DA]'>Description</th>
						<th className='p-3 text-center font-bold bg-[#26C6DA]'>Validitas</th>
						<th className='p-3 text-center font-bold bg-[#26C6DA]'>Koefisien</th>
						<th className='p-3 text-center font-bold bg-[#26C6DA]'>Poin</th>
						<th className='p-3 text-center font-bold bg-[#26C6DA]'>Score</th>
						<th className='p-3 text-center font-bold bg-[#26C6DA] rounded-r-lg'>
							Action
						</th>
					</tr>
				</thead>
				<tbody>
                    {data && data.length > 0 ? (
                        data.map((user, i) =>
                            user.jobdesc.map((job, index) => (
                                <tr key={`${i}-${index}`} className="bg-white hover:bg-gray-50 border border-gray-200">
                                    {index === 0 && (
                                        <>
                                            <td rowSpan={user.jobdesc.length} className="p-3 align-top font-semibold text-gray-700 text-center">
                                                {page * length + i + 1}
                                            </td>
                                            <td rowSpan={user.jobdesc.length} className="p-3 align-top font-medium text-gray-700">
                                                {user.position}
                                            </td>
                                            <td rowSpan={user.jobdesc.length} className="p-3 align-top font-medium text-gray-700">
                                                {user.name}
                                            </td>
                                        </>
                                    )}
                                    <td className="p-3 text-left font-medium text-gray-800">{job.jobdesc}</td>
                                    <td className="p-3 text-left font-medium text-gray-800">
                                        {<div dangerouslySetInnerHTML={{ __html: job.description }} />}
                                    </td>
                                    <td className="p-3 text-center font-semibold text-gray-800">{job.validitas}</td>
                                    <td className="p-3 text-center font-semibold text-gray-800">{job.koefisien}</td>
                                    <td className="p-3 text-center font-semibold text-gray-800">{job.poin}</td>
                                    <td className="p-3 text-center font-semibold text-gray-800">{job.score}</td>
                                    {index === 0 && (
                                        <td rowSpan={user.jobdesc.length} className="p-3 text-center">
                                            <button
                                                className="p-2 w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                                                title="Detail"
                                                onClick={() => handleDetail(id, user.user_id, user.position_id)}
                                            >
                                                <Icon icon="solar:align-vertical-center-broken" width="20" height="20" />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            )),
                        )
                    ) : (
                        <tr>
                            <td colSpan={9} className="text-center text-gray-500 p-3">
                                Data Kosong
                            </td>
                        </tr>
                    )}
                </tbody>;

				<tfoot>
					<tr>
						<td colSpan={9}>
							<Pagination
								page={page}
								length={length}
								totalRecords={totalRecords}
								rowsPerPageOptions={rowsPerPageOptions}
								handleRowsPerPageChange={handleRowsPerPageChange}
								handlePreviousPage={handlePreviousPage}
								handleNextPage={handleNextPage}
							/>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default Detail;
